export type Playlist = {
  name: string;
  description: string;
  images: string;
  id: string;
};

export type Track = {
  name: string;
  external_urls: string;
  id: string;
  analysis: JSON;
};
