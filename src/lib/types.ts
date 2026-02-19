export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  label?: "new" | "popular" | "bestseller";
  category: "coffee" | "tea" | "smoothie" | "other";
}
