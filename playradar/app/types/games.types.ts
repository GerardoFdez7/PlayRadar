export type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count?: number;
  image_background?: string;
};

export type Game = {
  id: number;
  name: string;
  background_image: string;
  released: string;
  slug: string;
  parent_platforms?: {
    platform: {
      id: number;
      name: string;
      slug: string;
    }
  }[];
  ratings_count?: number;
  genres: Genre[];
  short_screenshots?: {
    id: number;
    image: string;
  }[];
};

export type Trailer = {
  id: number;
  name: string;
  preview: string;
  data: {
    max: string;
  };
};
