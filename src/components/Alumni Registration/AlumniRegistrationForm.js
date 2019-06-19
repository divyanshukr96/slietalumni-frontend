import React, {Component} from 'react';
import {connect} from "react-redux";
import * as _ from "lodash";
import {Form, Row, Col, Input, Button, Checkbox, Select, Icon} from 'antd';
import FileUploadButton from "components/Alumni Registration/FileUploadButton";
import {Branch, Programme} from "Constants/ProgrammeAndBranch";
import FormError from "components/Errors";
import {registration} from "actions/newAlumniAction";


class RegisterForm extends Component {

    confirmAccept = (rule, value, callback) => {
        if (!value) callback('Accept the terms & conditions.'); else callback();
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) this.props.onRegister(values).then(res => {
                console.log(res);
            })
        });
    };

    render() {
        const {getFieldDecorator, resetFields} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth: 800}}>
                <FormError form={this.props.form}/>
                <Row gutter={24}>
                    <Col sm={12}>
                        <Form.Item label={'Name'} style={{marginBottom: 0}}>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Please enter your full name!'}],
                            })(<Input placeholder="Enter full name"/>)}
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item label={'Email'} style={{marginBottom: 0}}>
                            {getFieldDecorator('email', {
                                rules: [
                                    {required: true, message: 'Please enter your email-id!',},
                                    {type: 'email', message: 'The input is not valid e-mail!'},
                                ],
                            })(<Input placeholder="Enter email-id"/>)}
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item label={'Mobile'} style={{marginBottom: 0}}>
                            {getFieldDecorator('mobile', {
                                rules: [{required: true, message: 'Please enter your mobile number!'}],
                            })(<Input placeholder="Enter mobile number"/>)}
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
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
                    <Col sm={12}>
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
                    <Col sm={12}>
                        <Form.Item label={'Organisation'} style={{marginBottom: 0}}>
                            {getFieldDecorator('organisation', {
                                rules: [{required: true, message: 'Please enter your current organisation!'}],
                            })(<Input placeholder="Enter your current organisation"/>)}
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <Form.Item label={'Designation'} style={{marginBottom: 8}}>
                            {getFieldDecorator('designation', {
                                rules: [{required: true, message: 'Please enter your designation!'}],
                            })(<Input placeholder="Enter your designation"/>)}
                        </Form.Item>
                    </Col>
                    <Col sm={12}>
                        <FileUploadButton
                            label={'Photo'} name={'image'}
                            formProps={this.props.form}
                            itemProps={{
                                labelCol: {span: 4},
                                wrapperCol: {span: 20},
                            }}
                            decoratorProps={{
                                rules: [{required: true, message: 'Please select your photo!'}],
                            }}
                            style={{marginBottom: 8}}
                        >
                            <Button><Icon type="user"/> Select photo</Button>
                        </FileUploadButton>
                    </Col>
                    <Col span={24}>
                        <Form.Item style={{marginBottom: 0}}>
                            {getFieldDecorator('accept', {
                                valuePropName: 'checked', initialValue: false,
                                rules: [{validator: this.confirmAccept,}],
                            })(<Checkbox>I accept all information is correct</Checkbox>)}
                        </Form.Item>
                    </Col>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <Button style={{marginLeft: 8}} onClick={() => resetFields()}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const AlumniRegistrationForm = Form.create({name: 'alumni_registration'})(RegisterForm);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    onRegister: e => dispatch(registration(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlumniRegistrationForm);

