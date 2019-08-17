import React from 'react';
import {connect} from "react-redux";
import {Switch, Route} from 'react-router-dom'
import NotFound from "../components/NotFound";
import AdminNavBar from "../components/AdminNavBar";
import AlumniData from "../components/Alumni Database/AlumniData";
import AlumniDataTest from "../Tests/AlumniDataTest";
import RegistrationData from "components/Alumni Registration/RegistrationData";
import {Permission, Role} from "components/RolePermission";
import Users from "components/Users/Users";
import Events from "components/Events/Events";
import News from "components/News/News";
import NewsCreate from "components/News/NewsCreate";
import NewsView from "components/News/NewsView";
import EventTypes from "components/Events/EventTypes";
import EventAdd from "components/Events/EventAdd";
import EventView from "components/Events/EventView";
import FeaturedAlumni from "components/FeaturedAlumni/FeaturedAlumni";
import Image from "components/Images";

const AuthRoutes = (props) => {
    return (
        <AdminNavBar {...props}>
            <Switch>
                {/*<Route exact path="/sac" component={AdminNavBar}/>*/}
                <Route exact path="/sac/alumni-database" component={AlumniData}/>
                <Route exact path="/sac/new-registration" component={RegistrationData}/>

                <Route exact path="/sac/images" component={Image}/>

                <Route exact path="/sac/news" component={News}/>
                <Route exact path="/sac/news/create" component={NewsCreate}/>
                <Route exact path="/sac/news/:news" component={NewsView}/>

                <Route exact path="/sac/event-type" component={EventTypes}/>
                <Route exact path="/sac/events" component={Events}/>
                <Route exact path="/sac/events/create" component={EventAdd}/>
                <Route exact path="/sac/events/:event" component={EventView}/>

                <Route exact path="/sac/featured-alumni" component={FeaturedAlumni}/>

                <Route exact path="/sac/users" component={Users}/>
                <Route exact path="/sac/roles" component={Role}/>
                <Route exact path="/sac/permissions" component={Permission}/>

                <Route exact path="/sac/hello" component={() => 'component auth'}/>
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
