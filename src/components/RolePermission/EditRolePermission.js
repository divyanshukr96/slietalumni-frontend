import React, {Component} from 'react';
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {Form, Input, Modal, Select} from "antd";
import FormError from "components/Errors";


class EditRolePermission extends Component {
    onUpdate = () => {
        const {form, onClose, onUpdate} = this.props;
        form.validateFields((err, values) => {
            if (!err) onUpdate(values).then(res => {
                if (res) onClose(null)
            });
        });
    };

    render() {
        const {form: {getFieldDecorator}, data, permissions} = this.props;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <Modal
                visible={!_.isEmpty(this.props.data)}
                title="Role Edit"
                okText={'Update'}
                cancelText={'Cancel'}
                onOk={this.onUpdate}
                onCancel={() => this.props.onClose(null)}
                destroyOnClose={true}
                bodyStyle={{paddingBottom: 8}}
            >
                <Form {...formItemLayout}>
                    <FormError form={this.props.form}/>

                    <Form.Item label="Name" style={{marginBottom: 8}}>
                        {getFieldDecorator('name', {
                            initialValue: data.name,
                        })(<Input readOnly/>)}
                    </Form.Item>

                    <Form.Item label="Display Name" style={{marginBottom: 8}}>
                        {getFieldDecorator('display_name', {
                            initialValue: data.display_name,
                            rules: [{required: true, message: 'Display name field is required!'}],
                        })(<Input placeholder="Enter display name"/>)}
                    </Form.Item>

                    <Form.Item label="Description" style={{marginBottom: 8}}>
                        {getFieldDecorator('description', {
                            initialValue: data.description,
                        })(<Input.TextArea placeholder="Enter description here" autosize/>)}
                    </Form.Item>

                    <Form.Item label="Permission" style={{marginBottom: 8}}>
                        {getFieldDecorator('permission', {
                            initialValue: data.permissions ? data.permissions.map(e => e.name) : null
                        })(<Select mode={"multiple"} placeholder="Select permission">
                            <Select.Option key="permission" value={null}>None</Select.Option>
                            {permissions.map(row =>
                                <Select.Option key={row.id} value={row.name}>{row.display_name}</Select.Option>)}
                        </Select>)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}


EditRolePermission.propTypes = {
    data: PropTypes.any.isRequired
};

export default Form.create({name: 'edit_role'})(EditRolePermission);