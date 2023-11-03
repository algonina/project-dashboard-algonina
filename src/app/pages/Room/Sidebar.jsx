import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeTabs, setActive] = useState('all');

  const [data, setData] = useState(['lorem ipsum', 'lorem ipsum 1']);
  return (
    <div>
      <SimpleBar className='mx-n4 px-3 email-menu-sidebar-scroll' data-simplebar>
        <div className='mail-list mt-3 fs-15'>
          {data.map((item, i) => {
            return (
              <Link to='#' key={i} onClick={() => ({})} className={'py-2'}>
                <i className='ri-mail-fill me-2 align-middle fw-medium'></i>{' '}
                <span className='mail-list-link fw-normal'>{item} </span>
              </Link>
            );
          })}
        </div>

        <div>
          <h5 className='fs-12 text-uppercase text-muted mt-4'>Labels</h5>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
