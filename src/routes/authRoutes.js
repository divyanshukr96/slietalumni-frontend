import React from 'react';
import {connect} from "react-redux";
import {Switch, Route} from 'react-router-dom'
import NotFound from "../components/NotFound";
import AdminNavBar from "../components/AdminNavBar";
import AlumniData from "../components/Alumni Database/AlumniData";
import AlumniDataTest from "../Tests/AlumniDataTest";
import RegistrationData from "components/Alumni Registration/RegistrationData";
import {Permission, Role} from "components/RolePermission";

const AuthRoutes = (props) => {
    return (
        <AdminNavBar {...props}>
            <Switch>
                {/*<Route exact path="/sac" component={AdminNavBar}/>*/}
                <Route exact path="/sac/alumni-database" component={AlumniData}/>
                <Route exact path="/sac/new-registration" component={RegistrationData}/>

                <Route exact path="/sac/roles" component={Role}/>
                <Route exact path="/sac/permissions" component={Permission}/>

                <Route exact path="/sac/hello" component={() => 'componenet auth'}/>
                <Route exact path="/sac/test" component={AlumniDataTest}/>
                <Route path={'*'} component={NotFound}/>
            </Switch>
        </AdminNavBar>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AuthRoutes);