import { Fragment } from "react";

import "./table.scss";
import TableRow from "./tableRow";

interface TableProps {
  tableHeader: Record<string, string>[];
  tableBody: any[];
  displayedColumns: string[];
  hasError: boolean;
  canSelectRow: boolean;
}

export const Table = ({
  tableHeader,
  tableBody,
  hasError,
  displayedColumns,
  canSelectRow,
}: TableProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {tableHeader.map((column, index) => {
            return <th key={index}>{column.columnName}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {hasError ? (
          <tr>Sorry, looks like there was a problem getting your records.</tr>
        ) : (
          <Fragment>
            {tableBody.length > 0 &&
              tableBody.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    index={index}
                    row={row}
                    displayedColumns={displayedColumns}
                    canSelectRow={canSelectRow}
                  />
                );
              })}
          </Fragment>
        )}
      </tbody>
    </table>
  );
};

export default Table;
