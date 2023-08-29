interface SearchRequest {
  // search: Sorted by relevance, then points, then number of comments
  // search_by_date: Sorted by date, more recent first
  type: "search" | "search_by_date";
  page: number;
  tags:
    | "story"
    | "comment"
    | "poll"
    | "pollopt"
    | "show_hn"
    | "ask_hn"
    | "front_page"
    | "job"
    | `author_${string}`
    | `story_${string}`;
}

interface SearchResponse {
  hits: HitItem[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: {
    nbHits: boolean;
    typo: boolean;
  };
  query: string;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: {
    _request: {
      roundTrip: number;
    };
    afterFetch: {
      total: number;
    };
    total: number;
  };
  serverTimeMS: number;
}

interface HitItem {
  created_at: string;
  title: string;
  url: string | null;
  author: string;
  points: number;
  story_text: string | null;
  comment_text: string | null;
  num_comments: number | null;
  story_id: number | null;
  story_title: string | null;
  story_url: string | null;
  parent_id: number | null;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: {
    title: {
      value: string;
      matchLevel: string;
      matchedWords: string[];
    };
    url: {
      value: string;
      matchLevel: string;
      matchedWords: string[];
    };
    author: {
      value: string;
      matchLevel: string;
      matchedWords: string[];
    };
  };
}

export type { SearchRequest, SearchResponse, HitItem };
