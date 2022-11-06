export type Comment = {
  id: string;
  content: string;
  created_at: string;
  note_id: string;
  user_id: string | undefined;
};
export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string | undefined;
  comments: Comment[];
};
