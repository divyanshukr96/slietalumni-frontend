import React, {Component} from 'react';
import * as _ from 'lodash';
import * as PropTypes from "prop-types";
import {Button, DatePicker, Modal, Form, Input, Select, Checkbox, Icon, Radio, Spin, Divider} from 'antd';

import FormError from "components/Errors";
import FileUploadButton from "components/Registration/FileUploadButton";

class NewAlumniDataForm extends Component {
    state = {newAlumni: false, data: [], loading: false};

    confirmAccept = (rule, value, callback) => {
        if (!value) callback('Accept the terms & conditions.'); else callback();
    };

    toggle = () => this.setState(s => ({newAlumni: !s.newAlumni}));

    renderForm = () => {
        const {getFieldDecorator} = this.props.form;
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
            <>
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


                <Form.Item label="Organisation" style={{marginBottom: 8}}>
                    {getFieldDecorator('organisation', {
                        rules: [{required: true, message: 'Organisation field is required!'}],
                    })(<Input placeholder="Enter current organisation"/>)}
                </Form.Item>

                <Form.Item label="Designation" style={{marginBottom: 8}}>
                    {getFieldDecorator('designation', {
                        rules: [{required: true, message: 'Designation field is required!'}],
                    })(<Input placeholder="Enter current designation"/>)}
                </Form.Item>

                <Form.Item label="Featured Till" style={{marginBottom: 8}}>
                    {getFieldDecorator('featured', {
                        rules: [{required: true, message: 'Featured till date is required!'}],
                    })(<DatePicker format={"D MMM YYYY"} placeholder="Featured till date"/>)}
                </Form.Item>

                <FileUploadButton
                    label={'Alumni Photo'} name={'image'}
                    formProps={this.props.form}
                    decoratorProps={{rules: [{required: true, message: 'Please select alumni photo!'}]}}
                    uploadProps={{
                        accept: 'image/*',
                        listType: 'picture',
                    }}
                    style={{marginBottom: 8}}
                >
                    <Button><Icon type="file-image"/> Select photo</Button>
                </FileUploadButton>

                <Form.Item {...formTailLayout} style={{marginBottom: 8}}>
                    {getFieldDecorator('accept', {
                        valuePropName: 'checked', initialValue: false,
                        rules: [{validator: this.confirmAccept,}],
                    })(<Checkbox>I accept, the given information is verified</Checkbox>)}
                </Form.Item>
            </>
        )
    };

    render() {
        const {visible, onCancel, onCreate, form, onSearch, onSelect, alumni, data} = this.props;
        const {getFieldDecorator} = form;
        const {fetching, loading} = this.state;
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
                title="Add Featured Alumni"
                okText="Save"
                onCancel={onCancel}
                onOk={onCreate}
                // okButtonProps={{disabled: !getFieldValue('accept')}}
                bodyStyle={{paddingTop: 16}}
                confirmLoading={loading}
                maskClosable={false}
            >
                <Form {...formItemLayout}>
                    <FormError form={this.props.form} formName="new_featured_alumni"/>

                    <div style={{textAlign: 'center', marginBottom: 8}}>
                        <Radio.Group defaultValue={this.state.newAlumni} buttonStyle="solid" onChange={this.toggle}>
                            <Radio.Button value={false}>Registered Alumni</Radio.Button>
                            <Radio.Button value={true}>New Alumni</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Divider style={{margin: `8px -8px`}}/>

                    {this.state.newAlumni ? this.renderForm() : <>
                        <Form.Item
                            style={{marginBottom: 8}}
                            wrapperCol={{sm: {span: 16, offset: 4}}}
                        >
                            {getFieldDecorator('alumni', {
                                rules: [{required: true, message: 'Select registered alumni!'}],
                            })(<Select
                                showSearch
                                // labelInValue
                                placeholder="Search registered alumni"
                                notFoundContent={fetching ? <Spin size="small"/> : null}
                                filterOption={false}
                                onSearch={onSearch}
                                onChange={onSelect}
                            >
                                {alumni.map(d => (
                                    <Select.Option key={d.id}>{d.name}</Select.Option>
                                ))}
                            </Select>)}
                        </Form.Item>


                        {data && <>
                            <Form.Item label={"Name"} style={{marginBottom: 0}}>
                                {data.name}
                            </Form.Item>
                            <Form.Item label={"Email"} style={{marginBottom: 0}}>
                                {data.email}
                            </Form.Item>
                            <Form.Item label={"Organisation"} style={{marginBottom: 0}}>
                                {data.organisation}
                            </Form.Item>
                            <Form.Item label={"Designation"} style={{marginBottom: 0}}>
                                {data.designation}
                            </Form.Item>

                            <Form.Item label="Featured Till" style={{marginBottom: 8}}>
                                {getFieldDecorator('featured', {
                                    rules: [{required: true, message: 'Featured till date is required!'}],
                                })(<DatePicker format={"D MMM YYYY"} placeholder="Featured till date"/>)}
                            </Form.Item>

                            <FileUploadButton
                                label={'Alumni Photo'} name={'image'}
                                formProps={this.props.form}
                                uploadProps={{
                                    accept: 'image/*',
                                    listType: 'picture',
                                    defaultFileList: data.image && [{
                                        uid: _.random(),
                                        url: data.image,
                                        thumbUrl: data.image_thumb,
                                        name: _.split(data.image, '/').pop(),
                                    }]
                                }}
                                style={{marginBottom: 8}}
                            >
                                <Button><Icon type="file-image"/> Change photo</Button>
                            </FileUploadButton>
                        </>}
                    </>}

                </Form>
            </Modal>
        );
    }
}


const CollectionCreateForm = Form.create({name: 'new_featured_alumni'})(NewAlumniDataForm);

class NewFeaturedAlumni extends Component {
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
                this.props.onAlumniAdd(_.pickBy(values)).then(res => {
                    if (res) this.handleCancel();
                    this.formRef.setState({loading: false});
                });
            }
        });
    };

    render() {
        return (
            <>
                <Button icon="plus" type="primary" style={{marginBottom: 8, float: 'right'}} onClick={this.showModal}>
                    Add
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={formRef => this.formRef = formRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    onSearch={this.props.onSearch}
                    onSelect={this.props.onSelect}
                    alumni={this.props.alumni}
                    {...this.props}
                />
            </>
        );
    }
}

NewFeaturedAlumni.propTypes = {
    onAlumniAdd: PropTypes.any.isRequired,
    onSearch: PropTypes.func.isRequired,
    alumni: PropTypes.array.isRequired
};

export default NewFeaturedAlumni
