export type User = {
  name: string;
  screen_name: string;
  description: string;
};

export type Tweet = {
  created_at: string;
  id: string;
  text: string;
  full_text: string;
  user: User;
};

export type SearchResult = {
  statuses: Tweet[];
};
