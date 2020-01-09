import React, {useState} from 'react';
import {connect} from "react-redux";
import * as _ from "lodash";
import {Form, Row, Col, Input, Button, Checkbox, Select, Icon} from 'antd';
import FileUploadButton from "components/Registration/FileUploadButton";
import {Branch, Programme} from "Constants/ProgrammeAndBranch";
import FormError from "components/Errors";
import {registration} from "actions/newAlumniAction";
import RegistrationSubmitted from "./RegistrationSubmitted";


const RegistrationForm = Form.create({name: 'alumni_registration'})(
    ({form, onRegister}) => {

        const [success, setSuccess] = useState(false);
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState(null);

        const {getFieldDecorator, resetFields} = form;

        const confirmAccept = (rule, value, callback) => {
            if (!value) callback('Accept the terms & conditions.'); else callback();
        };

        const handleSubmit = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    onRegister(values).then(res => {
                        if (res) {
                            setData(res);
                            setSuccess(true);
                        }
                        setLoading(false);
                    });
                }
            });
        };

        return (
            <>
                <RegistrationSubmitted visible={success} data={data}/>
                <Form onSubmit={handleSubmit}>
                    <FormError form={form} formName="alumni_registration"/>
                    <Row gutter={12} type="flex">
                        <Col sm={12} xs={24}>
                            <Form.Item label={'Name'} style={{marginBottom: 0}}>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: 'Please enter your full name!'}],
                                })(<Input placeholder="Enter full name"/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={12} xs={24}>
                            <Form.Item label={'Email'} style={{marginBottom: 0}}>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {required: true, message: 'Please enter your email-id!',},
                                        {type: 'email', message: 'The input is not valid e-mail!'},
                                    ],
                                })(<Input placeholder="Enter email-id"/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={12} xs={24}>
                            <Form.Item label={'Mobile'} style={{marginBottom: 0}}>
                                {getFieldDecorator('mobile', {
                                    rules: [{required: true, message: 'Please enter your mobile number!'}],
                                })(<Input placeholder="Enter mobile number"/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={12} xs={24}>
                            <Form.Item label={'Programme'} style={{marginBottom: 0}}>
                                {getFieldDecorator('programme', {
                                    rules: [{required: true, message: 'Please select your programme!'}],
                                })(<Select placeholder="Select programme">
                                    <Select.Option key="programme" value={null}>None</Select.Option>
                                    {Programme.map(row =>
                                        <Select.Option key={row.value} value={row.value}>{row.text}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col sm={12} xs={24}>
                            <Form.Item label={'Branch'} style={{marginBottom: 0}}>
                                {getFieldDecorator('branch', {
                                    rules: [{required: true, message: 'Please select your branch!'}],
                                })(<Select placeholder="Select branch">
                                    <Select.Option key="branch" value={null}>None</Select.Option>
                                    {Branch.map(row =>
                                        <Select.Option key={row.value} value={row.value}>{row.text}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Item label={'Passing Year'} style={{marginBottom: 0}}>
                                {getFieldDecorator('passing', {
                                    rules: [{required: true, message: 'Select your passing year!'}],
                                })(<Select placeholder="Select passing year" showSearch>
                                    <Select.Option key="passing" value={null}>None</Select.Option>
                                    {_.range(new Date().getFullYear(), 1985).map(row =>
                                        <Select.Option key={row} value={row}>{row}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Item label={'Batch'} style={{marginBottom: 0}}>
                                {getFieldDecorator('batch', {
                                    rules: [{required: true, message: 'Select your batch!'}],
                                })(<Select placeholder="Select batch" showSearch>
                                    <Select.Option key="batch" value={null}>None</Select.Option>
                                    {_.range(new Date().getFullYear() - 3, 1985).map(row =>
                                        <Select.Option key={row} value={row}>{row}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col sm={12} xs={24}>
                            <Form.Item label={'Organisation'} style={{marginBottom: 0}}>
                                {getFieldDecorator('organisation', {
                                    rules: [{required: true, message: 'Please enter your current organisation!'}],
                                })(<Input placeholder="Enter your current organisation"/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={12} xs={24}>
                            <Form.Item label={'Designation'} style={{marginBottom: 0}}>
                                {getFieldDecorator('designation', {
                                    rules: [{required: true, message: 'Please enter your designation!'}],
                                })(<Input placeholder="Enter your designation"/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={12} xs={24}>
                            <Form.Item label={'LinkedIn Profile'} style={{marginBottom: 8}}>
                                {getFieldDecorator('linkdein', {
                                    initialValue: '',
                                    rules: [{type: 'url', message: 'Please enter your LinkedIn profile link!'}]
                                })(<Input placeholder="Enter your LinkedIn profile link"/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={12} xs={24}>
                            <FileUploadButton
                                label={'Photo'} name={'image'}
                                formProps={form}
                                itemProps={{
                                    // labelCol: {span: 4},
                                    // wrapperCol: {span: 20},
                                }}
                                decoratorProps={{rules: [{required: true, message: 'Please select your photo!'}]}}
                                uploadProps={{accept: 'image/*'}}
                                style={{marginBottom: 8}}
                            >
                                <Button><Icon type="user"/> Select photo</Button>
                            </FileUploadButton>
                        </Col>
                        <Col span={24} >
                            <Form.Item style={{marginBottom: 0}}>
                                {getFieldDecorator('accept', {
                                    valuePropName: 'checked', initialValue: false,
                                    rules: [{validator: confirmAccept}],
                                })(<Checkbox>I accept all information is correct</Checkbox>)}
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{textAlign: 'right', marginBottom: 16}}>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Register
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={() => resetFields()}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    onRegister: e => dispatch(registration(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

