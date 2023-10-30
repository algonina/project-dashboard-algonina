import React from "react";
// import { PaginationLinks } from "./PaginationLinks";
import { PaginationListStandalone } from "react-bootstrap-table2-paginator";
import { PaginationToolbar } from "./PaginationToolbar";
export function Pagination(props) {
  const { children, isLoading, paginationProps } = props;
  const loading = true;

  return (
    <div>
      {children}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        {!loading
          ? <PaginationListStandalone {...paginationProps} />
          : <PaginationListStandalone {...paginationProps} />}
        <PaginationToolbar
          isLoading={isLoading}
          paginationProps={paginationProps}
        />
      </div>
    </div>
  );
}
