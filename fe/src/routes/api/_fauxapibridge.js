const crypto = require("crypto");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

const fetch = require("node-fetch");

const _ = require("lodash");

dayjs.extend(utc);

const fs = require("fs");

const creds = JSON.parse(fs.readFileSync("_credentials.json", "utf8"));

const base_url = "fauxapi/v1/";

function generate_auth(apikey, apisecret) {
  let nonce = crypto
    .randomBytes(50)
    .toString("base64")
    .replace(/[=/+]/g, "") // Replace all instances of `=`, `/` and `+`
    .substring(0, 8);

  let timestamp = dayjs.utc().format("YYYYMMDD[Z]HHmmss");
  let hash = crypto
    .createHash("sha256")
    .update(`${apisecret}${timestamp}${nonce}`)
    .digest("hex");

  return `${apikey}:${timestamp}:${nonce}:${hash}`;
}

//TODO: Remove `export`. It is kept around for debugging via URL
export async function api(action, params = {}, host) {
  let auth = generate_auth(creds.apikey, creds.apisecret);

  host = "192.168.3.1";

  let response;
  if (Object.keys(params).length == 0) {
    // No params, do GET
    response = await fetch(`http://${host}/${base_url}?action=${action}`, {
      headers: { "fauxapi-auth": auth },
    });
  } else {
    // Do POST
    response = await fetch(`http://${host}/${base_url}?action=${action}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "fauxapi-auth": auth },
    });
  }

  return await response.json();
}

// Formatter
function format(config, interfaces) {
  let formatted = {};

  // Format interfaces
  let active_interfaces = _.get(config, "data.config.interfaces");
  let all_interfaces = _.get(interfaces, "data.return");
  formatted["interfaces"] = _format_interfaces(
    active_interfaces,
    all_interfaces
  );

  return formatted;
}

function _format_interfaces(active_interfaces, all_interfaces) {
  // Physical interfaces
  let physical = _.keys(all_interfaces);

  // All active interfaces
  let active = _.uniq(
    _.concat(_.map(_.values(active_interfaces), (x) => x.if))
  );

  // Now find which ones are not physical
  let notphysical = _.difference(active, physical);

  let to_display = _.map(
    _.sortBy(_.uniq(_.concat(physical, active)), (x) => x),
    function (x) {
      return { name: x };
    }
  );

  let parents = [];
  for (let x of to_display) {
    if (_.includes(notphysical, x.name)) {
      x.type = "notphysical";
      let matchingphysical = _.find(physical, function (p) {
        // Find igbX from igbX.YY
        return x.name.split(".")[0] == p;
      });
      x.parent = matchingphysical;
      // Setting an empty object here so that FE doesnt complain
      x.physicaldetails = {};
      x.vlanid = x.name.split(".")[1];

      parents.push(matchingphysical);
    } else {
      x.type = "physical";
      x.physicaldetails = all_interfaces[x.name];
    }

    for (let [origname, name] of _.entries(
      _.mapValues(active_interfaces, "if")
    )) {
      if (name == x.name) {
        x.details = active_interfaces[origname];
        x.details.original_name = origname;
      }
    }
  }

  // Loop one more time and tag parent ifaces
  for (let x of to_display) {
    x.is_parent = _.includes(parents, x.name);
  }

  console.log(to_display);

  return {
    active: active_interfaces,
    all: all_interfaces,
    display: to_display,
  };
}

// Public interfaces
export async function get_config() {
  return api("config_get");
}

export async function call_function(params) {
  return api("function_call", params);
}

export async function get_payload(params) {
  let config = await get_config();
  let interfaces = await call_function({ function: "get_interface_list" });
  return format(config, interfaces);
}
