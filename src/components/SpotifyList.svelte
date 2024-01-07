<script lang="ts">
  import type { LocalStorageTracks, TracksResponse } from "../types";
  import { backupSpotifyTracks } from "../data/backup-spotify-tracks";
  import {
    LS_SPOTIFY_TRACKS_CACHE_LIMIT,
    LS_SPOTIFY_TRACKS_KEY,
  } from "../constants";

  const fetchTracks = async (): Promise<TracksResponse[]> => {
    const ls = localStorage || window.localStorage;

    // first off, check local storage for if any tracks exist there
    const lsTracksRaw = ls.getItem(LS_SPOTIFY_TRACKS_KEY);

    if (lsTracksRaw) {
      // found a local storage version
      // so first we parse the JSON and cast it to the correct type
      const lsTracks = JSON.parse(lsTracksRaw) as LocalStorageTracks;

      // we then check the datestamp, and whether enough time has passed
      // to warrant calling the API again
      if (Date.now() < lsTracks.datestamp + LS_SPOTIFY_TRACKS_CACHE_LIMIT) {
        // enough time has not passed, so let's return the local storage tracks
        return lsTracks.tracks;
      }
    }

    const rawResponse = await fetch(
      "https://spotify-worker.josephshambrook.workers.dev/top?limit=5",
    ).catch(() => {});

    if (rawResponse && rawResponse?.status === 200) {
      // we have received a decent response, so we parse it
      const response = (await rawResponse.json()) as TracksResponse[];

      // we then store the result in local storage to be reused if needed
      const lsObject: LocalStorageTracks = {
        datestamp: Date.now(),
        tracks: response,
      };

      ls.setItem(LS_SPOTIFY_TRACKS_KEY, JSON.stringify(lsObject));

      // finally, return the finished tracks
      return new Promise((resolve) => resolve(response));
    }

    // little easter egg if things go wrong
    return new Promise((resolve) => resolve(backupSpotifyTracks));
  };

  let tracks = fetchTracks();
</script>

{#await tracks}
  <p>Loading</p>
{:then tracks}
  <ul class="list">
    {#each tracks as track}
      <li class="track">
        <div class="track-name">
          <a
            href={track.href}
            title={`Open "${track.name}" on Spotify`}
            target="_blank"
            rel="noopener noreferrer">{track.name}</a
          >
        </div>
        <div>{track.artist}</div>
      </li>
    {/each}
  </ul>
{/await}

<style>
  .list {
    list-style: none;
    padding-inline-start: 0;
  }

  .list > .track:not(:last-of-type) {
    border-block-end: 2px solid;
    border-image-slice: 1;
    margin-block-end: 0.5rem;
    padding-block-end: 0.6rem;
  }

  .track-name a {
    /* color: rgb(var(--accent)); */
    /* color: hsl(124, 100%, 75%); */
    color: hsl(72 50% 15%);
    font-weight: bold;
  }
</style>
