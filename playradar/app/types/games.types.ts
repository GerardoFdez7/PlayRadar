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
};

export type Trailer = {
  id: number;
  name: string;
  preview: string;
  data: {
    max: string;
  };
};

export type SetGamesFunc = (value: Game[]) => void;
export type SetOrderFunc = (value: string) => void;

export type UseSearchResultsParams = {
  games: Game[];
  searchText: string;
};

export type HandleSortingParams = {
  sortingFunction: (
    games: Game[],
    order: string,
    setFilteredGames: SetGamesFunc,
    setOrder: SetOrderFunc,
    col: string
  ) => void;
  col: string;
};

export type SortingGame = {
  [key: string]: string;
};

export type SortingNum = {
  [key: string]: number;
};

export type SearchResultsProps = {
  games: Game[];
  searchText: string;
};
