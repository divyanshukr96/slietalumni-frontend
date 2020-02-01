import React from 'react';
import {Route as RouteComponent, Switch, Redirect} from 'react-router-dom'
import NotFound from "../components/NotFound";
import PublicNavBar from "../components/PublicNavBar";
import Login from "../components/Auth/Login";
import ContactUs from "../components/ContactUs";
import Home from "../components/Home";
import Advisory from "../components/Advisory";
import DirectorMessage from "../components/Message/DirectorMessage";
import DeanMessage from "../components/Message/DeanMessage";
import ChairmanMessage from "../components/Message/ChairmanMessage";
import Association from "../components/About/Association";
import SAAConstitution from "../components/About/SAAConstitution";
import PresidentMessage from "../components/Message/PresidentMessage";
import FormLayout from "../components/Form/FormLayout";
import DonateButton from "components/DonateButton";
import Register from "components/Registration/Register";
import RegisterConfirmation from "components/Registration/Confirmation";
import Profile from "components/Profile";
import Feeds from "components/Feeds/Feeds";
import Donate from 'components/Donation'
import EventLists from "../components/Events/EventLists";
import EventDetails from "../components/Events/EventDetails";
import NewsLists from "../components/News/NewsLists";
import NewsDetails from "../components/News/NewsDetails";
import MeetRegistration from "../components/Meet/MeetRegistration";
import ResetPassword from "../components/Auth/ResetPassword";
import Executive from "../containers/Executive";
import PublicGallery from "../components/Images/PublicGallery";
import StudentCell from "../containers/StudentCell";

const Route = ({component: Component, ...rest}) => (
    <RouteComponent
        {...rest}
        render={props => (
            <Component {...props}/>
        )}
    />
);


const PublicRoutes = () => {
    return (
        <>
            <DonateButton/>
            <PublicNavBar>
                <Switch>
                    <Route exact path={'/'} component={Home}/>

                    <Route exact path={'/donate'} component={Donate}/>

                    <Route exact path={'/form'} component={FormLayout}/>

                    <Route exact path={'/about'} component={() => <Redirect to={'/about/alumni-association'}/>}/>
                    <Route exact path={'/about/alumni-association'} component={Association}/>
                    <Route exact path={'/about/saa-constitution'} component={SAAConstitution}/>
                    <Route exact path={'/about/student-cell'} component={StudentCell}/>

                    <Route exact path={'/advisory-committee'} component={Advisory}/>
                    <Route exact path={'/executive-committee'} component={Executive}/>

                    <Route exact path={'/message'} component={() => <Redirect to={'/advisory-committee'}/>}/>
                    <Route exact path={'/message/director'} component={DirectorMessage}/>
                    <Route exact path={'/message/dean-sw'} component={DeanMessage}/>
                    <Route exact path={'/message/chairman'} component={ChairmanMessage}/>
                    <Route exact path={'/message/president'} component={PresidentMessage}/>

                    <Route exact path={'/meet/register'} component={MeetRegistration}/>

                    <Route exact path="/events" component={EventLists}/>
                    <Route exact path="/events/:event" component={EventDetails}/>

                    <Route exact path="/news" component={NewsLists}/>
                    <Route exact path="/news/:news" component={NewsDetails}/>

                    <Route exact path="/storied" component={NewsLists}/>
                    <Route exact path="/storied/:news" component={NewsDetails}/>

                    <Route exact path="/feeds" component={Feeds}/>

                    <Route exact path="/gallery" component={PublicGallery}/>

                    <Route exact path="/profile" component={Profile}/>

                    <Route exact path={'/login'} component={Login}/>
                    <Route exact path={'/register'} component={Register}/>
                    <Route exact path={'/registration/confirmation'} component={RegisterConfirmation}/>
                    <Route exact path={'/contact'} component={ContactUs}/>

                    <Route exact path={'/password/reset/:token'} component={ResetPassword}/>

                    <Route exact path={'/a'} component={() => 'Compnenet a'}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch>
            </PublicNavBar>
        </>
    );
};

export default PublicRoutes;
