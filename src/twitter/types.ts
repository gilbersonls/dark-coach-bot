export type Tweet = {
  created_at: string;
  id: string;
  text: string;
  full_text: string;
};

export type SearchResult = {
  statuses: Tweet[];
};
