import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {default as _, toLower} from 'lodash'
import {Button, Divider, Icon, Table, Typography} from "antd";
import NewRolePermission from "components/RolePermission/NewRolePermission";
import EditRolePermission from "components/RolePermission/EditRolePermission";
import {addNewRoles, fetchRolesPermissions, updateRole} from "actions/roleAction";

const {Title} = Typography;

const expandedRowRender = (data, index) => {
    const columns = [
        {title: 'Display Name', dataIndex: 'display_name', key: 'display_name'},
        {title: 'Description', dataIndex: 'description', key: 'description'},
        {title: 'Name', dataIndex: 'name', key: 'name'},
    ];
    const type = data.roles ? 'Roles' : 'Permissions';
    const dataSource = data[toLower(type)];
    if (dataSource.length) return (
        <>
            <Title level={4} style={{fontSize: 'initial'}}>{type} :-</Title>
            <Divider style={{margin: `8px 0`}}/>
            <Table columns={columns}
                   dataSource={dataSource}
                   pagination={false}
                   showHeader={false}
                   size={"middle"}
                   rowKey={a => `${index}_${a.id}`}
            />
        </>
    );
    return null
};

class RolePermission extends Component {
    constructor(props) {
        super(props);
        props.onLoading();
        props.onLoad();
    }

    columns = [
        {title: 'Display Name', dataIndex: 'display_name', sorter: (a, b) => this.shorting(a, b, 'display_name')},
        {title: 'Description', dataIndex: 'description'},
        {title: 'Name', dataIndex: 'name'},
        // {
        //     title: 'Guard', dataIndex: 'guard_name',
        //     filters: [{text: 'Web', value: 'web'}, {text: 'API', value: 'api'}],
        //     onFilter: (value, record) => record.guard_name.indexOf(value) === 0,
        // },
        {title: 'Created', dataIndex: 'created_at',},
        ...(this.props.type === 'Roles' ? [{
            title: 'Action',
            dataIndex: 'id',
            render: (id, record) => <Button type="dashed" size={"small"}
                                            onClick={() => this.props.onRoleEdit(record.id)}>
                <Icon type="edit"/> Edit</Button>

        }] : [])
    ];

    render() {
        const {data, role_permission, loading, onAddNewRole, onRoleEdit, onUpdateRole, type} = this.props;

        return (
            <div>
                <Title level={4}>
                    {type} {type === 'Roles' && <NewRolePermission
                    onAddRole={onAddNewRole}
                    permissions={role_permission.permissions}/>}
                </Title>
                <EditRolePermission
                    data={_.pickBy(data)}
                    onClose={onRoleEdit}
                    onUpdate={onUpdateRole}
                    permissions={role_permission.permissions}
                />
                <Table
                    style={{overflow: 'overlay'}}
                    loading={loading}
                    size={"middle"}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={role_permission[toLower(type)]}
                    expandedRowRender={expandedRowRender}
                    expandRowByClick
                />
            </div>
        );
    }
}

const mapStateToProps = ({roles}) => ({
    loading: roles.loading,
    role_permission: roles,
    data: roles.data,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(fetchRolesPermissions()),
    onAddNewRole: (data) => dispatch(addNewRoles(data)),
    onUpdateRole: (data) => dispatch(updateRole(data)),
    onRoleEdit: (id) => dispatch({type: "ROLE_EDIT", payload: id}),
    onLoading: () => dispatch({type: "ROLE_LOADING"}),
});

RolePermission.propTypes = {
    type: PropTypes.oneOf(['Roles', 'Permissions']).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RolePermission);
