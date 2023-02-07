import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import CircularLoader from '../../../shared/circular-loader/circular-loader';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import styles from './main-layout.module.scss';

const ZoomSize = () => {
  return useSelector((state) => state.appFontSize.appFontSize);
};

export const MainLayout = () => {
  const apiLoading = useSelector((state) => state.common.apiLoading);
  return (
    <>
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
