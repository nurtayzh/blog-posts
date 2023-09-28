export interface ResponsePost {
  title: { rendered: string };
  date_gmt: Date;
  link: string;
  featured_media: string;
  _embedded?: Embedded;
}

interface Embedded {
  author: Author[];
  'wp:term': Term[][];
}

interface Author {
  name: string;
  link: string;
}

export interface Term {
  name: string;
}
