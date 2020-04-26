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
    interfaces: { active_interfaces: { wan: {} }, all_interfaces: {} }
  };
</script>

<div class="flex justify-between">
  {#each Object.entries(payload.interfaces.all_interfaces) as [iface, details]}
    <div class="flex items-center flex-col">
      <div class="uppercase tracking-widest text-xs text-gray-800">
        {details.friendly ? details.friendly : 'Add new'}
      </div>
      <div
        class="w-10 h-10 {details.up ? 'bg-green-400' : 'bg-gray-300'} mt-1
        text-tiny uppercase tracking-widest {details.up ? 'text-white' : 'text-gray-500'}
        text-center flex items-center justify-center">
        {#if payload.interfaces.active_interfaces.wan.if == iface}
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11A2.98 2.98 0
              0122 15c0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76
              3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0112 6m0-2C9.11 4 6.6 5.64
              5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24
              5-5 0-2.64-2.05-4.78-4.65-4.96A7.49 7.49 0 0012 4z" />
          </svg>
        {/if}
      </div>
      <div class="mt-2 uppercase tracking-wide text-xs text-gray-800">
        {details.ipaddr}
      </div>
      <div class=" uppercase tracking-tightest text-tiny text-gray-800">
        {details.mac}
      </div>
    </div>
  {/each}
</div>
