import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = (props) => {
  const [activeTabs, setActive] = useState('all');
  const { id, slug } = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);

  const { detailRoom, statusRoom, idRoom } = useSelector(({ modulRoom }) => ({
    detailRoom: modulRoom.detail,
    statusRoom: modulRoom.status,
    idRoom: modulRoom.id,
  }));

  useEffect(() => {
    if (Object.keys(detailRoom).length) {
      const { room_contents } = detailRoom;
      const { all_content } = room_contents;

      setData(all_content);
    }
  }, [detailRoom]);

  const { idContent, detailContent, statusContent } = useSelector(({ modulContentRoom }) => ({
    idContent: modulContentRoom.id,
    detailContent: modulContentRoom.detail,
    statusContent: modulContentRoom.status,
  }));
  const { contentid } = useParams();
  const modulContentRoom = useSelector(({ modulContentRoom }) => modulContentRoom);

  return (
    <div className='h-100 w-100'>
      {statusRoom !== 'loading' || idRoom === id ? (
        <SimpleBar className='email-menu-sidebar-scroll h-100' data-simplebar>
          <div className='mail-list fs-15 pl-0 pr-0'>
            {data.map((item, i) => {
              let beforeid = '';
              if (contentid === item.code) {
                beforeid = i > 0 ? data[i - 1].code : '';
              }

              return (
                <Link
                  to={`/room/${slug}/${id}/${item.code}`}
                  key={i}
                  className={classnames('py-2 pl-3 link-sidebar', {
                    active: item.code === contentid,
                  })}
                >
                  <span className='mail-list-link fw-normal fs-14 text-dark py-1'>
                    {item.content_title}{' '}
                  </span>
                </Link>
              );
            })}
          </div>
        </SimpleBar>
      ) : (
        ''
      )}
    </div>
  );
};

export default Sidebar;
