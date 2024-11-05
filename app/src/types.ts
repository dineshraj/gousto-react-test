export interface Category {
  title: string;
  hidden: boolean;
  id: string;
}

export interface Product {
  title: string;
  description: string;
  categories: Array<string>;
  id: string;
}