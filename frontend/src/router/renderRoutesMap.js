import React from "react";
import AuthRoute from "./authRoute";

const renderRoutesMap = (routes) =>
  routes.map((route, i) => {
    return (
      <AuthRoute
        key={i}
        exact={route.exact}
        path={route.path}
        auth={route.is_auth}
        layout={route.layout}
        component={route.component}
        footer={route.footer}
      ></AuthRoute>
    );
  });

export default renderRoutesMap;
