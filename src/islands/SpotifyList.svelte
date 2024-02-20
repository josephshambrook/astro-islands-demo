<script lang="ts">
  /*
   * Hello! 👋
   * I've borrowed this code off of my my own website (josephshambrook.dev).
   * What it is doing, is calling a Cloudflare Worker of mine to get my
   * current top tracks from Spotify. These results usually get inundated
   * with Disney songs played for my young daughter, but it was still fun to
   * get working!
   * Anyway, I've added comments for what each part of the code is doing, so
   * have a read!
   */

  import { backupSpotifyTracks } from "@data/backup-spotify-tracks";
  import { addLog } from "@state/LogStore";
  import {
    LS_SPOTIFY_TRACKS_CACHE_LIMIT,
    LS_SPOTIFY_TRACKS_KEY,
  } from "../constants";
  import type { LocalStorageTracks, TracksResponse } from "../types";

  const fetchTracks = async (): Promise<TracksResponse[]> => {
    const ls = localStorage || window.localStorage;

    // first off, check local storage for if any tracks exist there
    const lsTracksRaw = ls.getItem(LS_SPOTIFY_TRACKS_KEY);

    if (lsTracksRaw) {
      // ah, I've saved my tracks to local storage before!
      // first we parse the JSON and cast it to the correct type
      const lsTracks = JSON.parse(lsTracksRaw) as LocalStorageTracks;

      // we then check the datestamp, and whether enough time has passed
      // to warrant calling the API again
      if (Date.now() < lsTracks.datestamp + LS_SPOTIFY_TRACKS_CACHE_LIMIT) {
        // enough time has not passed, so let's return the local storage tracks
        return lsTracks.tracks;
      }
    }

    // if we've reached this point, then either there were no tracks in local
    // storage to use, or they were outdated
    // so, we start a fetch call to the Cloudflare Worker for some tracks
    const rawResponse = await fetch(
      "https://spotify-worker.josephshambrook.workers.dev/top?limit=5",
    ).catch(() => {});

    if (rawResponse && rawResponse?.status === 200) {
      try {
        // we have received a decent response, so we parse it as JSON and
        // cast it to the correct type
        const response = (await rawResponse.json()) as TracksResponse[];

        // we then store the result in local storage to be reused if needed
        const lsObject: LocalStorageTracks = {
          datestamp: Date.now(),
          tracks: response,
        };
        ls.setItem(LS_SPOTIFY_TRACKS_KEY, JSON.stringify(lsObject));

        // finally, return the finished tracks
        return response;
      } catch (err) {
        return backupSpotifyTracks;
      }
    }

    // if we've reached this point or the catch above, there's been a
    // problem with the fetch call, so a backup list of cheekily-named tracks
    // is returned instead
    return backupSpotifyTracks;
  };

  let tracks = fetchTracks().then((tracks) => {
    addLog("Fetched tracks from Spotify");
    return tracks;
  });
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
  /* grabbed these from my site, so less urgency to convert to tailwind */
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
    color: color-mix(in srgb, var(--color-land) 30%, black);
    font-weight: bold;
  }
</style>
