export interface Article {
  id: string;
  position: number;
  title: string;
  teaser: string;
  source: string;
  url: string;
  imageUrl: string;
  credit: string;
  category?: string;
  issue: number;
  published: boolean;
}
