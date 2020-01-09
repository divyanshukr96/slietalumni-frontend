import React, {Component} from 'react';
import * as _ from "lodash";
import {Button} from "antd";
import RolePermissionForm from "components/RolePermission/RolePermissionForm";


class NewRolePermission extends Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
        this.formRef.props.form.resetFields();
    };

    handleCreate = () => {
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                this.formRef.setState({loading: true});
                this.props.onAddRole(_.pickBy(values)).then(res => {
                    if (res) this.handleCancel();
                    this.formRef.setState({loading: false});
                });
            }
        });
    };


    render() {
        return (
            <>
                <Button type="primary"
                        style={{float: 'right'}}
                        onClick={this.showModal}
                >
                    Add New Role
                </Button>
                <RolePermissionForm
                    wrappedComponentRef={formRef => this.formRef = formRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    permissions={this.props.permissions}
                />
            </>
        );
    }
}

export default NewRolePermission;
