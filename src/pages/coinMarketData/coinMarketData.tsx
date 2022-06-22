import { Fragment, useEffect, useState } from "react";

import Table from "components/table";

import CustomPagination from "components/pagination";
import { CoinType } from "types/coins";
import { getCoinMarketData } from "api/getCoinMarketData";

import "./coinMarketData.scss";

const tableHeader = [
  { columnName: "Image" },
  { columnName: "Symbol" },
  { columnName: "Name" },
  { columnName: "Current Price" },
  { columnName: "24H Changes" },
  { columnName: "Change %" },
];

const displayedColumns = [
  "image",
  "coin",
  "name",
  "current_price",
  "price_change_24h",
  "price_change_percentage_24h",
];

export const CoinMarketData = () => {
  const vs_currency = "cad";

  const [coinList, setCoinList] = useState<CoinType[] | []>([]);
  const [hasError, setHasErrror] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function fetchCoinMarketData() {
      const coinList = await getCoinMarketData(vs_currency, page);
      setCoinList(coinList);
    }

    fetchCoinMarketData();
  }, []);

  const handlePageChange = async (currentPage: number) => {
    const coinList = await getCoinMarketData(vs_currency, currentPage);
    setCoinList(coinList);
  };

  const handleSearchChange = async (searchTerm: string) => {
    const coins = await getCoinMarketData(vs_currency, page);
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.trim())
    );
    setCoinList(filtered);
  };

  return (
    <Fragment>
      <input
        className="searchField"
        onChange={(e: any) => handleSearchChange(e.target.value)}
        type="text"
      />
      <Table
        tableHeader={tableHeader}
        tableBody={coinList}
        hasError={hasError}
        displayedColumns={displayedColumns}
        canSelectRow={true}
      />
      <CustomPagination page={page} onPageChange={handlePageChange} />
    </Fragment>
  );
};

export default CoinMarketData;
