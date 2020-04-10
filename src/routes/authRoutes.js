import React from 'react';
import {useSelector} from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom'
import {Button, Result} from "antd";
import NotFound from "../components/NotFound";
import AdminNavBar from "../components/AdminNavBar";
import AlumniData from "../components/Alumni Database/AlumniData";
import AlumniDataTest from "../Tests/AlumniDataTest";
import RegistrationData from "components/Registration/RegistrationData";
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
import ImageCarousel from "components/Images/ImageCarousel";
import Image from "components/Images";
import AccessControl from "../AccessControl/AccessControl";
import Executive from "components/Member/Executive";
import Sac from "components/Member/SAC";
import AlumniMeet from "components/Meet/AlumniMeet";
import DonationData from "../components/Donation/DonationData";
import EnquiriesData from "../components/Enquiry/EnquiriesData";
import PublicNoticeData from "../components/PublicNotice/PublicNoticeData";
import GalleryImage from "../components/Images/GalleryImage";
import GalleryAlbum from "../components/Images/GalleryAlbum";
import GalleryAlbumDetails from "../components/Images/GalleryAlbumDetails";


const AuthRoutes = (props) => {
    const auth = useSelector(state => state.auth);

    if (!auth.isAuthenticated) return <Redirect to={'/login'}/>;
    return (
        <AccessControl
            allowedPermissions={['sac']}
            renderNoAccess={() => <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" onClick={() => props.history.push('/')}>Back Home</Button>}
            />}

        >
            <AdminNavBar {...props}>
                <Switch>
                    {/*<Route exact path="/sac" component={AdminNavBar}/>*/}
                    <Route exact path="/sac/alumni-database" component={AlumniData}/>
                    <Route exact path="/sac/new-registration" component={RegistrationData}/>
                    <Route exact path="/sac/alumni" component={RegistrationData}/>

                    <Route exact path="/sac/images" component={Image}/>
                    <Route exact path="/sac/images/carousel" component={ImageCarousel}/>
                    <Route exact path="/sac/images/gallery" component={GalleryImage}/>
                    <Route exact path="/sac/images/album" component={GalleryAlbum}/>
                    <Route exact path="/sac/images/album/:album" component={GalleryAlbumDetails}/>

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

                    <Route exact path="/sac/member" component={Sac}/>
                    <Route exact path="/sac/member/executive" component={Executive}/>

                    <Route exact path="/sac/alumni-meet" component={AlumniMeet}/>

                    <Route exact path="/sac/donation" component={DonationData}/>

                    <Route exact path="/sac/enquiries" component={EnquiriesData}/>

                    <Route exact path="/sac/public-notice" component={PublicNoticeData}/>

                    <Route exact path="/sac/hello" component={() => 'component auth'}/>
                    <Route exact path="/sac/test" component={AlumniDataTest}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch>
            </AdminNavBar>
        </AccessControl>
    );
};

export default AuthRoutes;
