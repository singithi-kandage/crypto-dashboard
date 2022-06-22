export interface CoinType {
  [key: string]: any;
  id: string;
  coin: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  image: string;
}

export interface PriceHistoryType {
  [key: string]: any;
  date: Date;
  day_of_week: string;
  price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}
