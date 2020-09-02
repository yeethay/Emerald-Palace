export interface ICategory {
  name: string | IMultiLanguageString;
  image: string;
  items: IItem[];
  entrees?: IEntree[];
  description?: IMultiLanguageString;
}

export interface IEntree {
  number: string;
  name: string;
}

export interface IItem {
  number?: string;
  name: string | IMultiLanguageString;
  description?: string;
  price: string | string[];
}

export interface IDiscount {
  name: string;
  description: string;
  note?: string;
}

export interface IMenu {
  discounts: IDiscount[];
  categories: ICategory[];
}

export interface IRestaurant {
  name: IMultiLanguageString;
  description: string;
  location: { address: string; href: string };
  phone: { label: string; href: string };
  hours: { day: string; hours: string }[];
}

export interface IMultiLanguageString {
  en: string;
  zh: string;
  vi?: string;
}

export enum Languages {
  ENGLISH = 'en',
  CHINESE = 'zh',
  VIETNAMESE = 'vi',
}

export interface Location {
  lat: number;
  lng: number;
}
