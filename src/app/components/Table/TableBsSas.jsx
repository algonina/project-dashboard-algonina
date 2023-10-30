import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';

// import { Pagination } from "../../../../vendor/_partials/controls";

// import dataSample from "./data.sample";
// import { getSelectRow } from "./TableRowSelected";

import PropTypes from 'prop-types';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import {
  defaulsizePerPageList,
  defaultShoted,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from './Config';
import { Pagination } from './Pagination';
import ExportCsvButton from './ExportCSVButton';
// import { TableHead } from "@material-ui/core";
// import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

class TableBsSas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      optionPagination: {
        custom: true,
        totalSize: props.dataTable.length,
        sizePerPageList: props.sizePerPage,
        page: 1,
        sizePerPage: 10,
        showTotal: true,
      },
      stateColumns: props.dataColumn,
      dataTable: props.dataTable,
    };
  }

  componentDidMount() {
    this.props.onRenderEndPoint();
  }

  onSelectRow = (props) => {
    this.setState((state) => ({
      ...state,
      ids: props,
    }));
  };

  componentWillUpdate(nextProps) {
    const { dataTable } = nextProps;
    const { optionPagination } = this.state;
    let page = optionPagination.page;

    if (dataTable !== this.props.dataTable) {
      if (dataTable !== this.props.dataTable || dataTable.length <= this.props.dataTable.length) {
        page = dataTable.length % optionPagination.sizePerPage ? page : page - 1;
        var newPage = Math.floor(dataTable.length / optionPagination.sizePerPage);
        page = newPage > page ? page : newPage;
        page = page < 1 ? 1 : page;
      }
      this.setState((state) => ({
        ...state,
        dataTable: dataTable,
        optionPagination: {
          ...optionPagination,
          totalSize: dataTable.length,
          page: page,
        },
      }));
    }
  }

  onPagination = (props, { pagination }) => {
    const { sizePerPage } = props;
    const { optionPagination } = this.state;
    const { options } = pagination;
    const { page } = options;
    if (sizePerPage !== optionPagination.sizePerPage) {
      this.setState((state) => ({
        ...state,
        optionPagination: {
          ...optionPagination,
          sizePerPage: sizePerPage,
          page: 1,
        },
      }));
    }
    if (page !== optionPagination.page && page !== undefined) {
      this.setState((state) => ({
        ...state,
        optionPagination: {
          ...optionPagination,
          page: page,
        },
      }));
    }
  };

  render() {
    const { optionPagination, dataTable } = this.state;
    const {
      loading,
      dataColumn,
      tabelTitle,
      search,
      className,
      dataExport,
      exportCsv,
      filenameCsv,
      defaultShoted,
      border,
    } = this.props;
    const { SearchBar } = Search;
    // const  {}} = CSVExport
    // const { ExportCSVButton } = CSVExport;

    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <ToolkitProvider
          keyField='id'
          columns={dataColumn}
          data={dataTable}
          search
          exportCsv={exportCsv}
        >
          {(toolkitprops) => (
            <div>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h5
                  className={
                    loading ? 'loading sub-title text-left w-50' : 'sub-title text-left w-50'
                  }
                >
                  {tabelTitle}
                </h5>
                <div className='w-50 d-flex justify-content-end align-items-center'>
                  {search ? (
                    <div className='p-0'>
                      <SearchBar {...toolkitprops.searchProps} className='m-0' />
                    </div>
                  ) : (
                    ''
                  )}
                  {exportCsv ? (
                    <ExportCsvButton data={dataTable} filename={filenameCsv} columns={dataExport} />
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <BootstrapTable
                keyField='id'
                isLoading={loading}
                data={dataTable === null ? [] : dataTable}
                columns={dataColumn ? dataColumn : []}
                defaultSorted={[defaultShoted]}
                hover
                bordered={border}
                onTableChange={this.onPagination(paginationProps, paginationTableProps)}
                {...toolkitprops.baseProps}
                {...paginationTableProps}
              />
              {!loading ? <NoRecordsFoundMessage isLoading={loading} entities={dataTable} /> : ''}
              <PleaseWaitMessage ntities={dataTable} isLoading={loading} />
            </div>
          )}
        </ToolkitProvider>
        <Pagination isLoading={loading} row paginationProps={paginationProps} />
      </div>
    );

    return (
      <PaginationProvider pagination={paginationFactory(optionPagination)}>
        {contentTable}
      </PaginationProvider>
    );
  }
}

TableBsSas.propTypes = {
  dataTable: PropTypes.array,
  dataColumn: PropTypes.array,
  sorted: PropTypes.array,
  sizePerPage: PropTypes.array,
  selectRows: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSelect: PropTypes.func,
  onOther: PropTypes.func,
  onRenderEndPoint: PropTypes.func,
  tabelTitle: PropTypes.string,
  search: PropTypes.bool,
  exportCsv: PropTypes.bool,
  dataExport: PropTypes.array,
  filenameCsv: PropTypes.string,
  defaultShoted: PropTypes.object,
  border: PropTypes.bool,
};

TableBsSas.defaultProps = {
  dataTable: [],
  dataColumn: [],
  sorted: defaultShoted,
  sizePerPage: defaulsizePerPageList,
  selectRows: false,
  loading: false,
  onDelete: () => {},
  onEdit: () => {},
  onOther: () => {},
  onSelect: () => {},
  onRenderEndPoint: () => {},
  tabelTitle: '',
  search: true,
  exportCsv: false,
  border: true,
  dataExport: [],
  filenameCsv: 'exportcsv',
  defaultShoted: { dataField: 'id', order: 'asc' },
};

export default TableBsSas;
