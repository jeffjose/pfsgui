<script>
  export let segment;
</script>

<style>

</style>

<nav class="h-10 border-b border-gray-300 w-full">
  <ul class="flex ">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        about
      </a>
    </li>
  </ul>
</nav>
