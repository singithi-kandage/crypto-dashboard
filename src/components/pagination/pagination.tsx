import React from "react";
import Pagination from "@mui/material/Pagination";

import "./pagination.scss";

interface CustomPaginationProps {
  page: number;
  onPageChange: (value: number) => void;
}

export const CustomPagination = ({
  page,
  onPageChange,
}: CustomPaginationProps) => {
  return (
    <div className="paginationContainer">
      <Pagination
        count={10}
        page={page}
        onChange={(event, value) => {
          onPageChange(value);
        }}
      />
    </div>
  );
};

export default CustomPagination;
