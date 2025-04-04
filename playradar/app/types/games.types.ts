import {
  Genre,
  ShortScreenshot,
  Trailer,
  Platform,
  Store,
  Developer,
  Publisher,
  ESRBRating,
  Tag,
} from './lists.types';

export type Game = {
  id: number;
  slug: string;
  name: string;
  released: string;
  genres: Genre[];
  ratings_count?: number;
  background_image: string;
  short_screenshots?: ShortScreenshot[];
  parent_platforms?: Platform[];
};

export type GameDetails = {
  id: number;
  name: string;
  slug: string;
  description_raw: string;
  genres: Genre[];
  released: string;
  ratings_count?: number;
  platforms?: Platform[];
  stores?: Store[];
  developers?: Developer[];
  publishers?: Publisher[];
  website?: string;
  esrb_rating?: ESRBRating;
  tags?: Tag[];
  metacritic?: number;
  metacritic_url?: string;
  // The requirements are within each Platform
};

export type GameMedia = {
  movies: Trailer[];
  short_screenshots: ShortScreenshot[];
};
