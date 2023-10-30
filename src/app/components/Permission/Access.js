import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Access = (props) => {
  const { yes, no, modul } = props;

  const { profilData } = useSelector(({ modulProfile }) => ({
    profilData: modulProfile.data,
  }));

  const checkPermissionAccess = (modul) => {
    let result = false;
    if (modul !== '') {
      const spliterModul = modul.split('|');
      const modulName = spliterModul[0] ? spliterModul[0] : '';
      const actionName = spliterModul[1] ? spliterModul[1] : '';
      const profilePermission = profilData.permission_modules ? profilData.permission_modules : [];
      if (profilePermission.length) {
        let access = profilePermission.filter((item) => item.modul_slug === modulName);

        if (access.length > 0) {
          access = access[0];
          result = access['permission_' + actionName] ? access['permission_' + actionName] : 0;

          return result;
        }
      }
    }
    return false;
  };

  return checkPermissionAccess(modul) ? (
    yes
  ) : (
    <p className='m-0' title={modul}>
      {no}
    </p>
  );
};
Access.propTypes = {
  yes: PropTypes.any,
  no: PropTypes.any,
  modul: PropTypes.string,
};
Access.defaultProps = {
  yes: <div>Allow Access</div>,
  no: 'You dont have permission',
  modul: '',
};
export default Access;
