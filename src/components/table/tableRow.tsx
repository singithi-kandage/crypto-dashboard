import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CoinType } from "types/coins";

interface TableRowProps {
  index: number;
  row: CoinType;
  displayedColumns: string[];
  canSelectRow: boolean;
}

interface DisplayedValueType {
  value: number | string;
  formatted: string;
}

const TableRow = ({
  index,
  row,
  displayedColumns,
  canSelectRow,
}: TableRowProps) => {
  let navigate = useNavigate();

  const displayedValues: DisplayedValueType[] = displayedColumns.map(
    (columnName) => {
      let text = row[columnName];

      if (
        columnName === "current_price" ||
        columnName === "price" ||
        columnName === "price_change_24h"
      ) {
        text = text.toLocaleString("en-US", {
          style: "currency",
          currency: "CAD",
        });
      }
      if (columnName.includes("percentage")) {
        text = `${text}% `;
      }

      return { value: row[columnName], formatted: text };
    }
  );

  const getStyle = (displayedValue: string | number) => {
    if (typeof displayedValue === "number" && displayedValue < 0) {
      return { color: "red" };
    } else if (typeof displayedValue === "number" && displayedValue > 0) {
      return { color: "green" };
    } else {
      return { color: "dark gray" };
    }
  };

  return (
    <tr
      className="table__row"
      key={index}
      onClick={() => {
        if (canSelectRow) {
          navigate(`./${row.id}`);
        }
      }}
    >
      {row && (
        <Fragment>
          {displayedValues.map((displayedValue, valIndex) => {
            return (
              <Fragment key={`column-${index}-${valIndex}`}>
                {typeof displayedValue.formatted === "string" &&
                (displayedValue.formatted.toLowerCase().includes(".png") ||
                  displayedValue.formatted.toLowerCase().includes(".jpg") ||
                  displayedValue.formatted.toLowerCase().includes(".jpeg")) ? (
                  <td key={`column-${index}-${valIndex}`}>
                    <img
                      className="table__image"
                      src={displayedValue.formatted}
                      alt="User"
                    />
                  </td>
                ) : (
                  <td
                    style={getStyle(displayedValue.value)}
                    key={`column-${index}-${valIndex}`}
                  >
                    {displayedValue.formatted}
                  </td>
                )}
              </Fragment>
            );
          })}
        </Fragment>
      )}
    </tr>
  );
};

export default TableRow;
