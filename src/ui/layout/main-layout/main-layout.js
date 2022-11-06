// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import styles from './main-layout.module.scss';

const ZoomSize = () => {
  return useSelector((state) => state.appFontSize.appFontSize);
};
export const MainLayout = () => (
  <div style={{ fontSize: ZoomSize() }}>
    <main>
      <Header />
      <section className={styles.main}>
        <Outlet />
      </section>
    </main>
    <Footer />
  </div>
);
