import Recat from 'react'
import {connect} from "react-redux";

const checkPermissions = (userPermissions, allowedPermissions) => {
    if (allowedPermissions.length === 0) {
        return true;
    }

    return userPermissions.some(permission =>
        allowedPermissions.includes(permission)
    );
};


const AccessControl = (
    {
        userPermissions,
        allowedPermissions,
        renderNoAccess,
        children,
    }) => {

    const permitted = checkPermissions(userPermissions, allowedPermissions);

    return permitted ? children : renderNoAccess();

};

AccessControl.defaultProps = {
    allowedPermissions: [],
    userPermissions: [],
    renderNoAccess: () => null,
};

const mapStateToProps = state => ({
    userPermissions: state.auth.isAuthenticated && state.auth.permissions
});

export default connect(mapStateToProps)(AccessControl);
