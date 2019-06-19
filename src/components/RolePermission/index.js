import React from "react";
import RolePermission from "components/RolePermission/RolePermission";

export const Permission = (props) => {
    return (
        <div>
            <RolePermission {...props} type={"Permissions"}/>
        </div>
    );
};

export const Role = (props) => {
    return (
        <div>
            <RolePermission {...props} type={"Roles"}/>
        </div>
    );
};