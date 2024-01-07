<script lang="ts">
  const logs = [];
</script>

<style>
  .list {
    list-style: none;
    padding-inline-start: 0;
  }

  .list > .log:not(:last-of-type) {
    border-block-end: 2px solid;
    border-image-slice: 1;
    margin-block-end: 0.5rem;
    padding-block-end: 0.6rem;
  }
</style>

{#if logs.length}
  <ul class="list">
    {#each logs as log}
      <li class="log">
        {log}
      </li>
    {/each}
  </ul>
{:else}
  <p>No logs, yet</p>
{/if}
