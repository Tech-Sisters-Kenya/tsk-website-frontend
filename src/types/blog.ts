export interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  extract: string;
  status: string;
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
  created_at: string;
  updated_at: string;
}

export interface BlogData {
  title: string;
  content: string;
  image_url: string;
  status: string;
  category_id: number;
  user_id: number;
  isFeatured: boolean;
}
