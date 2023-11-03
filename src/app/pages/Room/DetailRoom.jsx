import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../../components/Commons/BreadCrumb';
import { Container } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { actDetailDataRoom } from '../../modules/Room';
const DetailRoom = (props) => {
  const { id } = useParams();
  const { idRoom } = useSelector(({ modulRoom }) => ({
    idRoom: modulRoom.id,
  }));
  const dispath = useDispatch();
  useEffect(() => {
    if (id !== idRoom) {
      dispath(actDetailDataRoom({ id: id }));
    }
  }, [id, idRoom]);
  return (
    <div className='page-content'>
      <Container fluid>
        <BreadCrumb title={'Detail content'} />
        <div className='email-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1 border'>
          <div className='email-menu-sidebar h-100'>
            <div className='p-4 d-flex flex-column h-100'>
              <div className='pb-4 border-bottom border-bottom-dashed'>
                <button
                  type='button'
                  className='btn btn-danger w-100'
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <FeatherIcon icon='plus-circle' className='icon-xs me-1 icon-dual-light' />
                  New Content
                </button>
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailRoom;
