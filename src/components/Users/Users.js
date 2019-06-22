import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchUsers, userAdd, userDelete, userUpdate} from "actions/userAction";
import {Badge, Button, Table} from "antd";
import NewUser from "components/Users/NewUser";
import UserDetails from "components/Users/UserDetails";
import * as _ from 'lodash'
import {fetchRolesPermissions} from "actions/roleAction";

class Users extends Component {
    constructor(props) {
        super(props);
        props.onLoading();
        props.fetchUsers();
        props.onload();
    }


    columns = [
        {title: 'Name', dataIndex: 'name'},
        {title: 'Email', dataIndex: 'email'},
        {title: 'Mobile', dataIndex: 'mobile'},
        {title: 'Username', dataIndex: 'username'},
        {
            title: 'Status',
            dataIndex: 'active',
            render: (e) => e ? <span><Badge status="success"/>Active</span> :
                <span><Badge status="error"/>Inactive</span>,
        },
        {
            title: 'Action ',
            dataIndex: 'id',
            render: (id) => (
                <span>
                <Button onClick={() => this.props.onView(id)} size={"small"}>Roles</Button>
        <Button>View</Button>
        </span>
            ),
        },
    ];

    render() {
        const {data, loading, onUserAdd, onUserUpdate, onDelete, onView, roles, users} = this.props;
        return (
            <div>
                <UserDetails
                    data={_.pickBy(data)}
                    onClose={onView}
                    rolesList={roles}
                    onUserUpdate={onUserUpdate}
                    onDelete={onDelete}
                />
                <NewUser onUserAdd={onUserAdd}/>
                <Table
                    style={{overflow: 'overlay'}}
                    loading={loading}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={users}
                />
            </div>
        );
    }
}

const mapStateToProps = ({roles, users}) => ({
    roles: roles.roles,
    users: users.users,
    loading: users.loading,
    data: users.data
});
const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    onUserAdd: data => dispatch(userAdd(data)),
    onUserUpdate: (id, data) => dispatch(userUpdate(id, data)),
    onLoading: () => dispatch({type: 'USER_LOADING'}),
    onView: id => dispatch({type: 'USER_EDIT', payload: id}),
    onDelete: () => dispatch(userDelete()),

    onload: () => dispatch(fetchRolesPermissions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);