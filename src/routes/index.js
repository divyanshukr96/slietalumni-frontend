import React from "react";
import {Switch, Route} from "react-router-dom";

import PublicRoutes from "./publicRoutes";
import AuthRoutes from "./authRoutes";
import App from "../App";
import {BackTop} from "antd";

const routes = (
    <>
        <BackTop/>
        <Switch>
            <Route path='/sac' component={AuthRoutes}/>
            <Route path='/' component={() => <App><PublicRoutes/></App>}/>
        </Switch>
    </>
);

export default routes;