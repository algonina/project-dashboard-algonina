import React from 'react';
import PropTypes from 'prop-types';
import { Grid, _ } from 'gridjs-react';

const GridTable = (props) => {
  const { data, columns, pagination, limit, search } = props;
  return (
    <div>
      <Grid
        data={data}
        columns={['Name', 'Email', 'Position', 'Company', 'Country']}
        search={true}
        pagination={{ enabled: true, limit: 5 }}
      />
    </div>
  );
};

GridTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  pagination: PropTypes.bool,
  limit: PropTypes.number,
  search: PropTypes.bool,
};

export default GridTable;
