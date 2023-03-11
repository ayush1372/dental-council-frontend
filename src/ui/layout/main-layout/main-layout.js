import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { verboseLog } from '../../../config/debug';
import { parserJWT, userGroupTypeForSession } from '../../../helpers/functions/common-functions';
import CircularLoader from '../../../shared/circular-loader/circular-loader';
import { loginUser } from '../../../store/reducers/login-reducer';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import styles from './main-layout.module.scss';

const ZoomSize = () => {
  return useSelector((state) => state.appFontSize.appFontSize);
};

export const MainLayout = () => {
  const apiLoading = useSelector((state) => state.common.apiLoading);
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.loginReducer);

  useState(() => {
    if (
      localStorage.getItem('accesstoken') &&
      parserJWT(localStorage.getItem('accesstoken'))?.type === 'at'
    ) {
      let dataObj = {
        data: {
          profile_id: parserJWT(localStorage.getItem('accesstoken')).profile_id,

          user_group_id: userGroupTypeForSession(
            parserJWT(localStorage.getItem('accesstoken')).authorities[0]
          ),
        },
      };
      dispatch(loginUser(dataObj));
    }
  }, []);
  return (
    <>
      {verboseLog('loginData', loginData?.data?.user_group_id)}
      {apiLoading && <CircularLoader />}
      <div style={{ fontSize: ZoomSize() }}>
        <main>
          <Header />
          <section className={styles.main}>
            <Outlet />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};
