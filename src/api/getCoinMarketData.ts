import { CoinType } from "types/coins";

const BASE_URL = process.env.REACT_APP_BASE_COIN_GECKO_BASE_URL;
const OK = 200;

export const getCoinMarketData = async (vs_currency: string, page: number) => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=${vs_currency}&page=${page}&per_page=100`,
    {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );

  if (response.status === OK) {
    const responseBody = await response.json();

    const coinList: CoinType[] = responseBody.map((result: any) => {
      return {
        image: result.image,
        id: result.id,
        coin: result.symbol.toUpperCase(),
        name: result.name,
        current_price: result.current_price,
        price_change_24h: result.price_change_24h,
        price_change_percentage_24h: parseFloat(
          result.price_change_percentage_24h.toFixed(2)
        ),
      };
    });

    return coinList;
  } else {
    return [];
  }
};
