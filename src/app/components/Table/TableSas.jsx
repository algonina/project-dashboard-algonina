import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

const TableSas = (props) => {
  const { columns, rows } = props;
  const { SearchBar } = Search;

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: 'All',
        value: rows.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
  return (
    //
    <ToolkitProvider keyField={'id'} columns={columns} data={rows} search pagination>
      {(props) => (
        <>
          <div>
            <h6>Search</h6>
            <SearchBar {...props.searchProps} />
            <BootstrapTable {...props.baseProps} pagination={paginationFactory(options)} />
          </div>
        </>
      )}
    </ToolkitProvider>
  );
};

TableSas.defaultProp = {};

TableSas.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
};

export default TableSas;
