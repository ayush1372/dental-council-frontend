// import { Signup } from '../../pages';
import { Route, Routes } from 'react-router-dom';

import { Home } from '../../pages';
import { MainLayout } from '../../ui/layout';
import { lazyRetry } from '../../utilities/lazyload';
import { SuspenseBoundary } from './suspense-boundary';

const loadComponent = (component) => lazyRetry(() => import(`../../pages/${component}`));

export function RoutesGuard({ root = false, navMeta }) {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Default Home page route component mounted */}
        {root && <Route index element={<Home />} />}
        {navMeta.map((nav) => {
          const Component = loadComponent(nav.component);
          const isNav = nav.subNav && nav.subNav.length;

          return (
            <Route
              key={nav.path}
              index={nav.index}
              path={nav.path}
              element={
                <SuspenseBoundary>
                  <Component />
                </SuspenseBoundary>
              }
            >
              {isNav &&
                nav.subNav.map((subNav) => {
                  const SubComponent = loadComponent(
                    `${nav.component}/sub-pages/${subNav.component}`
                  );
                  return (
                    <>
                      {subNav.isIndex && (
                        <Route
                          index
                          element={
                            <SuspenseBoundary>
                              <SubComponent />
                            </SuspenseBoundary>
                          }
                        />
                      )}

                      <Route
                        key={subNav.path}
                        index={subNav.index}
                        path={subNav.path}
                        element={
                          <SuspenseBoundary>
                            <SubComponent />
                          </SuspenseBoundary>
                        }
                      />
                    </>
                  );
                })}
            </Route>
          );
        })}
      </Route>
    </Routes>
  );
}
