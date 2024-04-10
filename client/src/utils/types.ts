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

export type User = {
  id: string;
  name: string;
  external_urls: string;
  image: string;
};
