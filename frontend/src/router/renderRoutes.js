import React from "react";
import renderRoutesMap from "./renderRoutesMap";
import {
  Switch,
} from "react-router-dom";


const renderRoutes = ({ routes, extraProps = {}, switchProps = {} }) => (
    <Switch>{renderRoutesMap(routes)}</Switch>
);

export default renderRoutes;
