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
      localStorage.getItem('accesstoken') &&
      parserJWT(localStorage.getItem('accesstoken'))?.type === 'at'
    ) {
      let dataObj = {
        data: {
          profile_id: parserJWT(localStorage.getItem('accesstoken')).profile_id,

          user_group_id: userGroupTypeForSession(
            parserJWT(localStorage.getItem('accesstoken')).authorities[0]
          ),
          user_sub_type: Number(localStorage.getItem('userSubTypeID')),
          college_id: Number(localStorage.getItem('collegeID')),
          hp_profile_status_id: Number(localStorage.getItem('HPProfileStatusID')),
          work_flow_status_id: Number(localStorage.getItem('workProfileStatusID')),
          esign_status: Number(localStorage.getItem('esignStatus')),
          blacklisted: Number(localStorage.getItem('blacklistedStatus')),
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
          <ToastContainer />
          <section className={styles.main}>
            <Outlet />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};
