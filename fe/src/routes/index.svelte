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
  export let payload;
</script>

{JSON.stringify(payload)}
