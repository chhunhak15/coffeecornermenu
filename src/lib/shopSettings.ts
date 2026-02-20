const SHOP_NAME_KEY = "shop_name";
export const getShopName = () => localStorage.getItem(SHOP_NAME_KEY) || "Coffee Corner";
export const setShopName = (name: string) => localStorage.setItem(SHOP_NAME_KEY, name);

const SHOP_LOGO_KEY = "shop_logo";
export const getShopLogo = (): string | null => localStorage.getItem(SHOP_LOGO_KEY);
export const setShopLogo = (url: string | null) => {
  if (url) localStorage.setItem(SHOP_LOGO_KEY, url);
  else localStorage.removeItem(SHOP_LOGO_KEY);
};
