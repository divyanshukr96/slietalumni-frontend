import React, {Component} from "react";
import {Form, Input, Modal, Select} from "antd";
import FormError from "components/Errors";

class RolePermissionForm extends Component {
    render() {
        const {visible, onCancel, onCreate, form, permissions} = this.props;
        const {getFieldDecorator} = form;
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
                visible={visible}
                title="Create New"
                okText="Save"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form {...formItemLayout}>
                    <FormError form={form}/>
                    <Form.Item label="Name" style={{marginBottom: 8}}>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Name field is required!'}],
                        })(<Input placeholder="Enter name"/>)}
                    </Form.Item>

                    <Form.Item label="Display Name" style={{marginBottom: 8}}>
                        {getFieldDecorator('display_name', {
                            rules: [{required: true, message: 'Display name field is required!'}],
                        })(<Input placeholder="Enter display name"/>)}
                    </Form.Item>

                    <Form.Item label="Description" style={{marginBottom: 8}}>
                        {getFieldDecorator('description')(<Input.TextArea placeholder="Enter description here" autosize/>)}
                    </Form.Item>

                    <Form.Item label="Permission" style={{marginBottom: 8}}>
                        {getFieldDecorator('permission')(<Select mode={"multiple"} placeholder="Select permission">
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

export default Form.create({name: 'new_role_permission'})(RolePermissionForm);