import * as PropTypes from 'prop-types';
import {connect} from "react-redux";

export const checkPermissions = (userPermissions, allowedPermissions) => {
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

AccessControl.propTypes = {
    allowedPermissions: PropTypes.array,
    userPermissions: PropTypes.array,
    renderNoAccess: PropTypes.func
};

AccessControl.defaultProps = {
    allowedPermissions: [],
    userPermissions: [],
    renderNoAccess: () => null,
};

const mapStateToProps = ({auth}) => ({
    userPermissions: (auth.isAuthenticated && auth.user && auth.user.permissions) || []
});

export default connect(mapStateToProps)(AccessControl);
