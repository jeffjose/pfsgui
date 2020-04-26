<script>
  import SideBar from "../components/SideBar.svelte";
  import TopBar from "../components/TopBar.svelte";

  export let segment;
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 12rem [content] 1fr;
    grid-template-rows: [content] 1fr;
    height: 100vh;
  }

  .content {
    grid-column: content;
    overflow: hidden;
  }
</style>

<div class="wrapper">
  <SideBar {segment} />
  <div class="content p-2 bg-gray-900">
    <TopBar {segment} />
    <main class="">
      <slot />
    </main>
  </div>
</div>
