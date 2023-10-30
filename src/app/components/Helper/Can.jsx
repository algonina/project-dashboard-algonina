import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const checkPermissionFunc = (modul = '') => {
  const { dataProfile } = useSelector(({ modulProfile }) => ({
    dataProfile: modulProfile.data,
  }));

  const { permission_modul } = dataProfile;
  if (modul !== '') {
    const splitModul = modul.split('|');

    const modulAccess = splitModul[0];
    const permissionAccess = splitModul[1] || '';

    if (permission_modul.length) {
      const getAccess = permission_modul.filter((item) => item.modul_slug === modulAccess);
      if (getAccess.length) {
        return getAccess[0][permissionAccess] === '1';
      }
    }
  }
  return false;
};

const Can = ({ modul, yes, no }) => {
  const [data, setData] = useState([]);
  const { dataProfile } = useSelector(({ modulProfile }) => ({
    dataProfile: modulProfile.data,
  }));

  useEffect(() => {
    if (Object.keys(dataProfile).length) {
      const { permission_modul } = dataProfile;
      setData(permission_modul);
    }
  }, [dataProfile]);

  const checkPermission = (modul = '') => {
    if (modul !== '') {
      const splitModul = modul.split('|');

      const modulAccess = splitModul[0];
      const permissionAccess = splitModul[1];

      if (data.length) {
        const getAccess = data.filter((item) => item.modul_slug === modulAccess);
        if (getAccess.length) {
          return getAccess[0][permissionAccess] === '1';
        }
      }
    }

    return false;
  };

  return <>{checkPermission(modul) ? yes : no}</>;
};

Can.propTypes = {
  modul: PropTypes.string,
  yes: PropTypes.any,
  no: PropTypes.any,
};

Can.defaultProps = {
  modul: '',
};

export default Can;
