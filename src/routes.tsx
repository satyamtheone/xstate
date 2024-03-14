import React, { Fragment, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export interface IProps {
  children: JSX.Element;
}
export type TGeneralRoute = {
  exact?: boolean;
  path: string;
  guard?: ({ children }: IProps) => JSX.Element;
  layout?: ({ children }: IProps) => JSX.Element;
  component: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
};

export type TRoutes = Array<TGeneralRoute>;

const routes: TGeneralRoute[] = [
  {
    exact: true,
    path: "/",
    // layout: NonLogin,
    component: () => <Navigate to="/home" />,
  },
  {
    exact: true,
    path: "/page-one",
    // layout: NonLogin,
    component: lazy(() => import("src/Pages/PageOne.tsx").catch()),
  },
];

export const renderRoutes = () => (
  <Suspense>
    {routes.map((route, i) => {
      const { path, component, layout, guard } = route;
      const Component = component;
      const Layout = layout || Fragment;
      const Guard = guard || Fragment;
      return (
        <Route
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          path={path}
          element={
            <Guard>
              <Layout>
                {/* we need to pass key because component make unique */}
                <Component key={i} />
              </Layout>
            </Guard>
          }
        ></Route>
      );
    })}
  </Suspense>
);
