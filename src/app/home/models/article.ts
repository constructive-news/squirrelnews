export interface Article {
    id: number;
    name: string;
    teaser: string;
    imageURL: string;
    imageSource: string;
    category?: string;
    origin: string;
    date: string;
}
