<script context="module">
  export async function preload(page, session) {
    if (typeof window === "undefined") return;

    const res = await this.fetch("/pfsgui/api/pfsense.json");

    const payload = await res.json();

    console.log(payload);

    return { payload };

    // Dont do login check in developement
    if (process.env.NODE_ENV == "development") {
      return;
    }

    try {
      const res = await this.fetch("/pfsgui/_auth");
      const auth = await res.json();
      if (!auth.logged_in) {
        this.redirect(302, "/pfsgui/login");
      }
    } catch {
      this.redirect(302, "/pfsgui/login");
    }
  }
</script>

<script>
  export let payload = {};
</script>

{#if Object.keys(payload).length > 0}
  <div class="flex px-4 py-2 overflow-x-auto">
    <span
      class="absolute text-xs font-medium tracking-normal text-gray-700 uppercase">
      INTERFACES ({Object.keys(payload.interfaces.display).length})
    </span>
    {#each payload.interfaces.display as iface, i}
      <div
        class="relative w-40 flex items-center flex-col mr-4 {iface.parent ? '-mx-4' : '-mx-3'}
        mt-6 px-4 py-2 rounded hover:bg-accent-gray cursor-pointer">
        <!-- {#if iface.is_parent || iface.parent}
          <span
            class="absolute top-0 w-full inline-block text-right text-tiny
            uppercase border-b-2 {iface.parent ? 'h-5 px-1 py-1' : 'h-0'}
            bg-gray-600 border-gray-600">
            {iface.parent ? 'vlan' : ''}
          </span>
        {/if} -->

        <div
          class="text-xs mt-3 {(iface.type == 'physical' && iface.physicaldetails.friendly) || iface.type == 'notphysical' ? 'font-semibold text-gray-200 uppercase' : 'text-gray-700'}">
          {(iface.type == 'physical' && iface.physicaldetails.friendly) || iface.type == 'notphysical' ? iface.details.descr : 'Unassigned'}
        </div>
        <div
          class="h-10 {iface.type == 'physical' ? 'rounded-sm w-10' : 'rounded-full w-20'}
          {iface.physicaldetails.up || iface.type == 'notphysical' ? '' : 'bg-gray-800'}
          {(iface.physicaldetails.up || iface.type == 'notphysical') && iface.details.enable == '' ? 'bg-green-400' : 'bg-gray-800'}
          mt-3 text-tiny uppercase tracking-widest text-center flex items-center
          justify-center">
          {#if iface.physicaldetails.friendly == 'wan'}
            <svg class="text-gray-900 fill-current" height="24" width="24">
              <path
                d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11A2.98 2.98 0
                0122 15c0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76
                3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0112 6m0-2C9.11 4 6.6
                5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0
                5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96A7.49 7.49 0 0012 4z" />
            </svg>
          {:else if iface.type == 'notphysical'}
            <div>
              <span class="block mt-2 text-gray-900 text-tiny">VLAN</span>
              <span class="block -mt-1 text-xl text-gray-900">
                {iface.vlanid}
              </span>
            </div>
          {/if}
        </div>
        <div class="mt-3 text-xs font-normal text-gray-500 normal-case">
          {iface.name}
        </div>
        <div class="mt-1 text-xs text-gray-500">
          {#if iface.type == 'physical'}
            {iface.physicaldetails.ipaddr ? iface.physicaldetails.ipaddr : '-'}
          {:else}{iface.details.ipaddr ? iface.details.ipaddr : '-'}{/if}
        </div>
        <div class="mt-1 text-gray-600 uppercase text-tiny">
          {iface.type == 'physical' ? iface.physicaldetails.mac : '-'}
        </div>
      </div>
    {/each}
  </div>
{/if}
