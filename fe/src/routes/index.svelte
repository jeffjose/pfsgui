<script context="module">
    export async function preload(page, session){

  if (process.browser) {

    if (process.env.NODE_ENV == "development") {
      return
    }
      try {
      const res = await this.fetch('/pfsgui/_auth')
      const auth = await res.json()
      if (!auth.logged_in) {
        this.redirect(302, '/pfsgui/login')
      }
      }
      catch {
        this.redirect(302, '/pfsgui/login')
      }


    }

  }
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
