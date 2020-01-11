import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {Button, Modal, Form, Input, DatePicker, Icon, Radio, Select} from 'antd';
import FormError from "components/Errors";
import FileUploadButton from "../Registration/FileUploadButton";
import {executiveMemberType, sacMemberType} from "./MemberTypes";




const CollectionCreateForm = Form.create({name: 'new_sac_member'})(
    class extends Component {
        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator, getFieldValue} = form;
            const formItemLayout = {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 7},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },
            };

            const memberType = getFieldValue('sac') ? sacMemberType : executiveMemberType;

            return (
                <Modal
                    visible={visible}
                    title="Add new Member"
                    okText="Add"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form {...formItemLayout}>
                        <FormError form={this.props.form} formName="new_sac_member"/>

                        <Form.Item label={'Member Type'} style={{marginBottom: 8}}>
                            {getFieldDecorator('sac', {
                                initialValue: true,
                            })(<Radio.Group>
                                <Radio value={true}>SAC</Radio>
                                <Radio value={false}>SAA Executive</Radio>
                            </Radio.Group>)}
                        </Form.Item>

                        <Form.Item label="Name" style={{marginBottom: 8}}>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Please enter member full name'}],
                            })(<Input placeholder="Enter member full name"/>)}
                        </Form.Item>

                        <Form.Item label="Designation" style={{marginBottom: 8}}>
                            {getFieldDecorator('designation', {
                                rules: [{required: true, message: 'Please select member designation'}],
                            })(
                                <Select placeholder="Select member designation">
                                    {memberType.map(d => <Select.Option key={d} value={d}>{d}</Select.Option>)}
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="Member From" style={{marginBottom: 8}}>
                            {getFieldDecorator('from', {
                                rules: [{required: true, message: 'Membership from date is required!'}],
                            })(<DatePicker format={"D MMM YYYY"} placeholder="Select date"/>)}
                        </Form.Item>

                        <Form.Item label="Member Till" style={{marginBottom: 8}}>
                            {getFieldDecorator('to', {})(<DatePicker format={"D MMM YYYY"} placeholder="Select date"/>)}
                        </Form.Item>


                        <Form.Item label="Member Profile" style={{marginBottom: 8}}>
                            {getFieldDecorator('profile', {})(<Input placeholder="Enter member profile username"/>)}
                        </Form.Item>


                        <FileUploadButton
                            label={'Member Photo'} name={'image'}
                            formProps={this.props.form}
                            decoratorProps={{rules: [{required: true, message: 'Please select member photo!'}]}}
                            uploadProps={{
                                accept: 'image/*',
                                listType: 'picture',
                            }}
                            style={{marginBottom: 8}}
                        >
                            <Button><Icon type="file-image"/> Select member photo</Button>
                        </FileUploadButton>


                        {/*<Form.Item {...formTailLayout} style={{marginBottom: 8}}>*/}
                        {/*    {getFieldDecorator('active', {*/}
                        {/*        valuePropName: 'checked', initialValue: true,*/}
                        {/*    })(<Checkbox>Student Alumni Cell Member</Checkbox>)}*/}
                        {/*</Form.Item>*/}

                    </Form>
                </Modal>
            );
        }
    }
);

class NewMember extends Component {
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
            if (!err) this.props.onMemberAdd(values).then(res => {
                if (res) this.handleCancel()
            });
        });
    };

    render() {
        return (
            <>
                <Button type="primary" style={{marginLeft: 8, float: 'right'}} onClick={this.showModal}>
                    New Member
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

NewMember.propTypes = {
    onMemberAdd: PropTypes.any.isRequired,
};

export default NewMember
