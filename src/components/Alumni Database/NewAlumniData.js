import React, {Component} from 'react';
import * as _ from 'lodash';
import * as PropTypes from "prop-types";
import {Button, Modal, Form, Input, Select, Checkbox} from 'antd';
import {Programme, Branch} from 'Constants/ProgrammeAndBranch'
import FormError from "components/Errors";

class NewAlumniDataForm extends Component {

    confirmAccept = (rule, value, callback) => {
        if (!value) callback('Accept the terms & conditions.'); else callback();
    };

    render() {
        const {visible, onCancel, onCreate, form, loading} = this.props;
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
                title="Add new Alumni Data"
                okText="Save"
                onCancel={onCancel}
                onOk={onCreate}
                confirmLoading={loading}
                okButtonProps={{disabled: !getFieldValue('accept')}}
                maskClosable={false}
                destroyOnClose
            >
                <Form {...formItemLayout}>
                    <FormError form={this.props.form} formName="new_alumni_data"/>

                    <Form.Item label="Name" style={{marginBottom: 8}}>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Alumni name field is required!'}],
                        })(<Input placeholder="Enter full name"/>)}
                    </Form.Item>

                    <Form.Item label="E-mail" style={{marginBottom: 8}}>
                        {getFieldDecorator('email', {
                            rules: [{type: 'email', message: 'The input is not valid E-mail!'}],
                        })(<Input placeholder="Enter e-mail id"/>)}
                    </Form.Item>

                    <Form.Item label="Mobile" style={{marginBottom: 8}}>
                        {getFieldDecorator('mobile')(<Input placeholder="Enter mobile number"/>)}
                    </Form.Item>

                    <Form.Item label="Programme" style={{marginBottom: 8}}>
                        {getFieldDecorator('programme')(<Select placeholder="Select programme">
                            <Select.Option key="programme" value={null}>None</Select.Option>
                            {Programme.map(row =>
                                <Select.Option key={row.value} value={row.value}>{row.text}</Select.Option>)}
                        </Select>)}
                    </Form.Item>

                    <Form.Item label="Branch" style={{marginBottom: 8}}>
                        {getFieldDecorator('branch')(<Select placeholder="Select branch">
                            <Select.Option key="branch" value={null}>None</Select.Option>
                            {Branch.map(row =>
                                <Select.Option key={row.value} value={row.value}>{row.text}</Select.Option>)}
                        </Select>)}
                    </Form.Item>

                    <Form.Item label="Batch" style={{marginBottom: 8}}>
                        {getFieldDecorator('batch')(<Select placeholder="Select batch" showSearch>
                            <Select.Option key="batch" value={null}>None</Select.Option>
                            {_.range(new Date().getFullYear() - 3, 1980).map(row =>
                                <Select.Option key={row} value={row}>{row}</Select.Option>)}
                        </Select>)}
                    </Form.Item>

                    <Form.Item label="Passing Year" style={{marginBottom: 8}}>
                        {getFieldDecorator('passing')(<Select placeholder="Select passing year" showSearch>
                            <Select.Option key="passing" value={null}>None</Select.Option>
                            {_.range(new Date().getFullYear(), 1980).map(row =>
                                <Select.Option key={row} value={row}>{row}</Select.Option>)}
                        </Select>)}
                    </Form.Item>

                    <Form.Item label="Organisation" style={{marginBottom: 8}}>
                        {getFieldDecorator('organisation')(<Input placeholder="Enter current organisation"/>)}
                    </Form.Item>

                    <Form.Item label="Designation" style={{marginBottom: 8}}>
                        {getFieldDecorator('designation')(<Input placeholder="Enter current designation"/>)}
                    </Form.Item>

                    <Form.Item {...formTailLayout} style={{marginBottom: 8}}>
                        {getFieldDecorator('accept', {
                            valuePropName: 'checked', initialValue: false,
                            rules: [{validator: this.confirmAccept,}],
                        })(<Checkbox>I accept, the given information is verified</Checkbox>)}
                    </Form.Item>

                </Form>
            </Modal>
        );
    }
}


const CollectionCreateForm = Form.create({name: 'new_alumni_data'})(NewAlumniDataForm);

class NewAlumniData extends Component {
    state = {
        visible: false,
        loading: false,
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
                this.setState(s => ({...s, loading: true}));
                this.props.onAlumniAdd(_.pickBy(values)).then(res => {
                    if (res) this.handleCancel();
                    this.setState(s => ({...s, loading: false}));
                });
            }
        });
    };

    render() {
        return (
            <>
                <Button type="primary" style={{marginLeft: 8}} onClick={this.showModal}>
                    Add New Data
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={formRef => this.formRef = formRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    loading={this.state.loading}
                />
            </>
        );
    }
}

NewAlumniData.propTypes = {
    onAlumniAdd: PropTypes.any.isRequired,
};

export default NewAlumniData
