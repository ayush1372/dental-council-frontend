import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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

  useState(() => {
    if (
      sessionStorage.getItem('accesstoken') &&
      parserJWT(sessionStorage.getItem('accesstoken'))?.type === 'at'
    ) {
      let dataObj = {
        data: {
          profile_id: parserJWT(sessionStorage.getItem('accesstoken')).profile_id,

          user_group_id: userGroupTypeForSession(
            parserJWT(sessionStorage.getItem('accesstoken')).authorities[0]
          ),
          user_sub_type: Number(sessionStorage.getItem('userSubTypeID')),
          college_id: Number(sessionStorage.getItem('collegeID')),
          hp_profile_status_id: Number(sessionStorage.getItem('HPProfileStatusID')),
          work_flow_status_id: Number(sessionStorage.getItem('workProfileStatusID')),
          esign_status: Number(sessionStorage.getItem('esignStatus')),
          blacklisted: Number(sessionStorage.getItem('blacklistedStatus')),
          user_type: Number(sessionStorage.getItem('userType')),
        },
      };
      dispatch(loginUser(dataObj));
    }
  }, []);
  return (
    <>
      {apiLoading && <CircularLoader />}
      <div style={{ fontSize: ZoomSize() }}>
        <main>
          <Header />
          <section className={styles.main}>
            <ToastContainer />
            <Outlet />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};
