export type TracksResponse = {
  name: string;
  artist: string;
  href: string;
  album: string;
  image: {
    height?: number | undefined;
    url: string;
    width?: number | undefined;
  } | null;
};

export type LocalStorageTracks = {
  datestamp: number;
  tracks: TracksResponse[];
};

export type Log = string;
export type Logs = Log[];
