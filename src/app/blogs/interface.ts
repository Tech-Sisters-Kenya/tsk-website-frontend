export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  extract: string;
  content: string;
  image_url: string;
  is_featured: boolean;
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
  };
  comments: {
    id: string;
    comment: string;
    author: string;
    created_at: string;
  }[];
  created_at: string;
  updated_at: string;
}
