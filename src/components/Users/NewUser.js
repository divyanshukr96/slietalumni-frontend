import React, {Component} from 'react';
import * as _ from 'lodash';
import * as PropTypes from "prop-types";
import {Button, Modal, Form, Input, Select, Checkbox} from 'antd';
import FormError from "components/Errors";

class NewAlumniDataForm extends Component {

    render() {
        const {visible, onCancel, onCreate, form} = this.props;
        const {getFieldDecorator, getFieldValue} = form;
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
        const formTailLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16, offset: 6},
            },
        };
        return (
            <Modal
                visible={visible}
                title="Add new User"
                okText="Add"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form {...formItemLayout}>
                    <FormError form={this.props.form}/>
                    <Form.Item label="Name" style={{marginBottom: 8}}>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please enter user full name'}],
                        })(<Input placeholder="Enter user full name"/>)}
                    </Form.Item>

                    <Form.Item label="E-mail" style={{marginBottom: 8}}>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: 'Please enter user email'},
                                {type: 'email', message: 'The input is not valid E-mail!'}],
                        })(<Input placeholder="Enter user e-mail "/>)}
                    </Form.Item>

                    <Form.Item label="Mobile" style={{marginBottom: 8}}>
                        {getFieldDecorator('mobile', {
                            rules: [{required: true, message: 'Please enter user mobile number'}],
                        })(<Input placeholder="Enter user mobile number"/>)}
                    </Form.Item>

                    <Form.Item label="Username" style={{marginBottom: 8}}>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please enter unique username'}],
                        })(<Input placeholder="Enter unique username"/>)}
                    </Form.Item>

                    <Form.Item label="Password" style={{marginBottom: 8}}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please enter new password'}],
                        })(<Input.Password placeholder="Enter new password"/>)}
                    </Form.Item>

                    <Form.Item {...formTailLayout} style={{marginBottom: 8}}>
                        {getFieldDecorator('active', {
                            valuePropName: 'checked', initialValue: false,
                        })(<Checkbox>Activate the user</Checkbox>)}
                    </Form.Item>

                </Form>
            </Modal>
        );
    }
}


const CollectionCreateForm = Form.create({name: 'form_in_modal'})(NewAlumniDataForm);

class NewUser extends Component {
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
            if (!err) this.props.onUserAdd(values).then(res => {
                if (res) this.handleCancel()
            });
        });
    };

    render() {
        return (
            <>
                <Button type="primary" style={{marginLeft: 8}} onClick={this.showModal}>
                    Add New User
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={formRef => this.formRef = formRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </>
        );
    }
}

NewUser.propTypes = {
    onUserAdd: PropTypes.any.isRequired,
};

export default NewUser