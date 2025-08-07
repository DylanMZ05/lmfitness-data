export interface Product {
  id: string | number;
  title: string;
  description?: string;
  longDescription?: string;
  price: number | string;
  offerPrice?: number | string;
  images: string[];
  featuredId?: number | null;
  exclusiveId?: number | null;
  sinStock?: boolean;
  sabores?: string[];
  sabor?: string;
}

export interface Category {
  name: string;
  slug: string;
  image?: string;
  orden?: number;
  products: Product[];
}
