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
  <div class="flex px-4 py-2 overflow-x-auto border-b border-gray-800">
    <span
      class="absolute text-gray-700 font-medium uppercase tracking-normal
      text-xs">
      INTERFACES ({Object.keys(payload.interfaces.all_interfaces).length})
    </span>
    {#each Object.entries(payload.interfaces.all_interfaces) as [iface, details]}
      <div
        class="flex items-center flex-col -mx-3 mr-3 mt-6 px-4 py-2 rounded
        hover:bg-accent-gray cursor-pointer">
        <div
          class="text-xs {details.friendly ? 'font-semibold text-gray-200 uppercase' : 'text-gray-700'}">
          {details.friendly ? payload.interfaces.active_interfaces[details.friendly].descr : 'Unassigned'}
        </div>
        <div
          class="w-10 h-10 rounded-sm {details.up ? 'bg-green-400' : 'bg-gray-800'}
          mt-3 text-tiny uppercase tracking-widest text-center flex items-center
          justify-center">
          {#if payload.interfaces.active_interfaces.wan.if == iface}
            <svg class="fill-current text-white" height="24" width="24">
              <path
                d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11A2.98 2.98 0
                0122 15c0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76
                3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0112 6m0-2C9.11 4 6.6
                5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0
                5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96A7.49 7.49 0 0012 4z" />
            </svg>
          {/if}
        </div>
        <div class="text-xs mt-3 font-normal normal-case text-gray-500">
          {iface}
        </div>
        <div class="mt-1 uppercase text-xs text-gray-500">
          {details.ipaddr ? details.ipaddr : '-'}
        </div>
        <div class=" uppercase text-tiny text-gray-600">{details.mac}</div>
      </div>
    {/each}
  </div>
{/if}
