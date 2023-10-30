import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

//import images
import avatar1 from '../../assets/images/users/avatar-1.jpg';
import { actLogout } from '../../../app/modules/Auth';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));

  const dispatch = useDispatch();

  const { dataProfile } = useSelector(({ modulProfile }) => ({
    dataProfile: modulProfile.data,
  }));
  const [data, setData] = useState({
    fullname: '',
    username: '',
    photo: null,
    type: '',
  });

  useEffect(() => {
    if (Object.keys(dataProfile).length) {
      setData(dataProfile);
    }
  }, [dataProfile]);
  const [userName, setUserName] = useState('Admin');

  useEffect(() => {
    if (sessionStorage.getItem('authUser')) {
      const obj = JSON.parse(sessionStorage.getItem('authUser'));
      setUserName(user.first_name || obj.data.first_name || 'Admin');
    }
  }, [userName, user]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className='ms-sm-3 header-item topbar-user'
      >
        <DropdownToggle tag='button' type='button' className='btn shadow-none'>
          <span className='d-flex align-items-center'>
            <img
              className='rounded-circle bg-white header-profile-user'
              src={data.photo || avatar1}
              alt='Header Avatar'
            />
            <span className='text-start ms-xl-2'>
              <span className='d-none d-xl-inline-block ms-1 fw-medium user-name-text fw-bold'>
                {data.fullname}
              </span>
              <span className='d-xl-block ms-1 fs-12 text-muted user-name-sub-text text-capitalize'>
                {data.type}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-end'>
          <h6 className='dropdown-header'>Welcome {data.fullname}!</h6>
          <Link to='/profile' className='dropdown-item'>
            <i className='mdi mdi-account-circle text-muted fs-16 align-middle me-1'></i>
            <span className='align-middle'>Profile</span>
          </Link>
          <DropdownItem href='/apps-chat' className='d-none'>
            <i className='mdi mdi-message-text-outline text-muted fs-16 align-middle me-1'></i>{' '}
            <span className='align-middle'>Messages</span>
          </DropdownItem>
          <DropdownItem href='/apps-tasks-kanban' className='d-none'>
            <i className='mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1'></i>{' '}
            <span className='align-middle'>Taskboard</span>
          </DropdownItem>
          <DropdownItem href='/pages-faqs' className='d-none'>
            <i className='mdi mdi-lifebuoy text-muted fs-16 align-middle me-1'></i>{' '}
            <span className='align-middle'>Help</span>
          </DropdownItem>
          <div className='dropdown-divider'></div>
          <DropdownItem href='/pages-profile' className='d-none'>
            <i className='mdi mdi-wallet text-muted fs-16 align-middle me-1'></i>{' '}
            <span className='align-middle'>
              Balance : <b>$5971.67</b>
            </span>
          </DropdownItem>
          <DropdownItem href='/pages-profile-settings' className='d-none'>
            <span className='badge bg-soft-success text-success mt-1 float-end'>New</span>
            <i className='mdi mdi-cog-outline text-muted fs-16 align-middle me-1'></i>{' '}
            <span className='align-middle'>Settings</span>
          </DropdownItem>
          <Link href='/auth-lockscreen-basic' className='d-none'>
            <i className='mdi mdi-lock text-muted fs-16 align-middle me-1'></i>{' '}
            <span className='align-middle'>Lock screen</span>
          </Link>
          <DropdownItem href='#' onClick={() => dispatch(actLogout())}>
            <i className='mdi mdi-logout text-muted fs-16 align-middle me-1'></i>{' '}
            <span className='align-middle' data-key='t-logout'>
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
