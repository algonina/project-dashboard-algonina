import React, { useEffect, useState, ReactNode } from 'react';
import PropsType from 'prop-types';

const AppLoading = (props) => {
  const { loading } = props;
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    }
  }, [loading]);

  return (
    <>
      {load ? (
        <>
          <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
            <div className='clearfix'>
              <h5 className='text-center  me-4'>Loading...</h5>
            </div>
          </div>
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

AppLoading.propTypes = {
  loading: PropsType.bool,
  children: ReactNode || PropsType.any,
};
export default AppLoading;
