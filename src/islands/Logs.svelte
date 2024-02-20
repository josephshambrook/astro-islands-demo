<script lang="ts">
  import { logs } from "@state/LogStore";

  // on load, lets populate the logs
  // clearLogs();
  // addLog("Started!");
</script>

{#if $logs.length}
  <ul class="list-none pl-0">
    {#each $logs as log}
      <li class="log">
        {log}
      </li>
    {/each}
  </ul>
{:else}
  <p>No logs, yet</p>
{/if}

<style>
  /* Hacky because meh with chaining all of these with `[&:not(:last-child)]:` */
  ul > .log:not(:last-of-type) {
    border-block-end: 2px solid;
    border-image-slice: 1;
    margin-block-end: 0.5rem;
    padding-block-end: 0.6rem;
  }
</style>
