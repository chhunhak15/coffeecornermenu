import { Product } from "./types";

const PRODUCTS_KEY = "drink_menu_products";
const AUTH_KEY = "drink_menu_auth";
const ADMIN_PASSWORD = "admin123"; // Simple demo password

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Espresso",
    description: "Rich and bold single shot espresso",
    price: 3.5,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop",
    label: "popular",
    category: "coffee",
  },
  {
    id: "2",
    name: "Matcha Latte",
    description: "Creamy ceremonial grade matcha with oat milk",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=400&fit=crop",
    label: "new",
    category: "tea",
  },
  {
    id: "3",
    name: "Caramel Macchiato",
    description: "Vanilla-infused espresso with caramel drizzle",
    price: 5.0,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop",
    label: "bestseller",
    category: "coffee",
  },
  {
    id: "4",
    name: "Berry Smoothie",
    description: "Fresh mixed berries blended with yogurt",
    price: 6.0,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop",
    category: "smoothie",
  },
  {
    id: "5",
    name: "Chai Latte",
    description: "Spiced black tea with steamed milk",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=400&h=400&fit=crop",
    label: "popular",
    category: "tea",
  },
  {
    id: "6",
    name: "Cold Brew",
    description: "Smooth 24-hour steeped cold brew coffee",
    price: 4.0,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    label: "new",
    category: "coffee",
  },
];

export function getProducts(): Product[] {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  }
  return JSON.parse(stored);
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}
