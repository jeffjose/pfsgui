<script context="module">

    export async function preload(page, session){

  if (process.browser) {

    if (process.env.NODE_ENV == "developement") {
      return
    }

      try {
        const res = await this.fetch('/pfsgui/_auth')
        const auth = await res.json()
        if (auth.logged_in) {
          this.redirect(302, '/')
        }
      }
    catch {
    }


    }

  }
</script>
<h1> You must login </h1>
