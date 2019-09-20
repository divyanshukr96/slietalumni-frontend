import React from 'react';
import ProfileDetails from "components/Profile/ProfileDetails";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Index = (props) => {
    if (!props.auth.isAuthenticated) return <Redirect to={'/login'}/>;
    return (
        <div>
            <ProfileDetails/>
        </div>
    );
};


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Index);