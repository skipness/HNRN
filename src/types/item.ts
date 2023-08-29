interface Item {
  id: number;
  created_at: string;
  created_at_i: number;
  type: "comment" | "story";
  author: string;
  title: string;
  url: string | null;
  text: string;
  points: number;
  parent_id: number | null;
  story_id: number | null;
  children: Item[];
  options: [];
}

export type { Item };
