interface Meta {
  id: number;
  created_at: string;
  created_at_i: number;
  author: string | null;
  text: string | null;
}

interface Comment extends Meta {
  children: Comment[];
  options: [];
  parent_id: number;
  points: null;
  story_id: number;
  title: null;
  type: "comment";
  url: null;
}

interface Job extends Meta {
  children: [];
  options: [];
  parent_id: null;
  points: number;
  story_id: null;
  title: string;
  type: "job";
  url: string;
}

interface Poll extends Meta {
  children: Comment[];
  options: PollOpt[];
  parent_id: null;
  points: number;
  story_id: null;
  title: string;
  type: "poll";
  url: null;
}

interface PollOpt extends Meta {
  children: [];
  options: [];
  parent_id: number;
  points: number;
  story_id: null;
  title: null;
  type: "pollopt";
  url: null;
}

interface Story extends Meta {
  children: Comment[];
  options: [];
  parent_id: null;
  points: number;
  story_id: null;
  title: string;
  type: "story";
  url: string | null;
}

type FlattenedComment = { item: Comment; parent: Item["id"][] };
type Item = Comment | Job | Poll | PollOpt | Story;

export type { Comment, Item, FlattenedComment };
