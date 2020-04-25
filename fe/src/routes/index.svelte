<script context="module">
  export async function preload(page, session) {
    if (typeof window === "undefined") return;

    const res = await this.fetch("/pfsgui/api/pfsense.json");

    const payload = await res.json();

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
  export let payload = {
    interfaces: { active_interfaces: {}, all_interfaces: {} }
  };
</script>

<p>--------</p>
{JSON.stringify(payload.interfaces.active_interfaces)}
<p>--------</p>
{JSON.stringify(payload.interfaces.all_interfaces)}
<p>--------</p>
{JSON.stringify(payload.interfaces.all_interfaces.igb0)}
{JSON.stringify(payload.interfaces.all_interfaces.igb1)}
<h1 class="text-6xl text-gray-900">Design</h1>
