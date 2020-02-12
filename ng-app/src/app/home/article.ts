export interface Article {
  id: string;
  title: string;
  teaser: string;
  source: string;
  url: string;
  imageURL: string;
  credit: string;
  origin: string;
  originTitle: string;
  originTeaser: string;
  originUrl: string;
  imageSource: string;
  category?: string;
  issue: number;
}
