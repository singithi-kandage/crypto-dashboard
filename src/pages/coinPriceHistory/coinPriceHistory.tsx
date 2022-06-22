import { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Table from "components/table";

import { PriceHistoryType } from "types/coins";
import { getCoinPriceHistory } from "api/getCoinPriceHistory";

const tableHeader = [
  { columnName: "Date" },
  { columnName: "Day of Week" },
  { columnName: "Price" },
  { columnName: "24H Changes" },
  { columnName: "Change %" },
];

const displayedColumns = [
  "date",
  "day_of_week",
  "price",
  "price_change_24h",
  "price_change_percentage_24h",
];

export const CoinPriceHistory = () => {
  let { id } = useParams();

  const vs_currency = "cad";
  const [coinPriceHistory, setCoinPriceHistory] = useState<
    PriceHistoryType[] | []
  >([]);
  const [hasError, setHasErrror] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCoinPriceHistory() {
      if (id) {
        const coinList = await getCoinPriceHistory(id, vs_currency);
        const sevenDay = coinList.pop();
        setCoinPriceHistory(coinList);
      }
    }

    fetchCoinPriceHistory();
  }, []);

  return (
    <Fragment>
      <h2>7-Day Price History of {id}</h2>
      <Table
        tableHeader={tableHeader}
        tableBody={coinPriceHistory}
        hasError={hasError}
        displayedColumns={displayedColumns}
        canSelectRow={false}
      />
    </Fragment>
  );
};

export default CoinPriceHistory;
