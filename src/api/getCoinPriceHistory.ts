import { PriceHistoryType } from "types/coins";

const BASE_URL = process.env.REACT_APP_BASE_COIN_GECKO_BASE_URL;
const OK = 200;

export const getCoinPriceHistory = async (id: string, vs_currency: string) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=${vs_currency}&days=7&interval=daily&order=market_cap_asc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );

  if (response.status === OK) {
    const responseBody = await response.json();
    const prices = responseBody.prices.reverse();

    const coinPriceHistory: PriceHistoryType[] = prices.map(
      (result: any, index: number) => {
        var date = new Date(result[0]);
        return {
          date: `${date.toLocaleString("en-US", {
            day: "numeric",
          })} ${date.toLocaleString("en-US", {
            month: "long",
          })}, ${date.getFullYear()}`,
          day_of_week: date.toLocaleString("en-US", { weekday: "long" }),
          price: result[1],
          price_change_24h: get24HChange(prices, result, index),
          price_change_percentage_24h: get24HChangePercentage(
            prices,
            result,
            index
          ),
        };
      }
    );

    return coinPriceHistory;
  } else {
    return [];
  }
};

const get24HChange = (
  prices: Record<number, number>[],
  current: any,
  index: number
) => {
  if (prices[index + 1]) {
    const oldPrice = prices[index + 1][1];
    const currentPrice = current[1];

    return currentPrice - oldPrice;
  }
  return 0;
};

const get24HChangePercentage = (
  prices: Record<number, number>[],
  current: any,
  index: number
) => {
  if (prices[index + 1]) {
    const oldPrice = prices[index + 1][1];
    const currentPrice = current[1];
    const percent = ((currentPrice - oldPrice) / oldPrice) * 100;

    return parseFloat(percent.toFixed(2));
  }
  return 0;
};
