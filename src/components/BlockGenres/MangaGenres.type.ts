export interface MangasGenres {
  data: MangaGenres[];
}

export interface MangaGenres {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}
