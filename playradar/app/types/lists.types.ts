export type Genre = {
  id: number;
  name: string;
  slug: string;
};

export type ShortScreenshot = {
  id: number;
  image: string;
};

export type Trailer = {
  id: number;
  name: string;
  preview: string;
  data: {
    max: string;
  };
};

export type Requirement = {
  minimum?: string;
  recommended?: string;
};

export type Platform = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
  requirements?: Requirement;
};

export type Store = {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
  };
};

export type Developer = {
  id: number;
  name: string;
  slug: string;
};

export type Publisher = {
  id: number;
  name: string;
  slug: string;
};

export type ESRBRating = {
  id: number;
  name: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
};
