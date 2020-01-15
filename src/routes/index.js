import React from "react";
import {Switch, Route} from "react-router-dom";

import PublicRoutes from "./publicRoutes";
import AuthRoutes from "./authRoutes";
import App from "../App";
import {BackTop} from "antd";
import LoginRequired from "../components/Auth/LoginRequired";
import Notifications from 'components/PublicNotice'

const routes = (
    <>
        <BackTop/>
        <LoginRequired/>
        <Notifications/>
        <Switch>
            <Route path='/sac' component={AuthRoutes}/>
            <Route path='/' component={() => <App><PublicRoutes/></App>}/>
        </Switch>
    </>
);

export default routes;
