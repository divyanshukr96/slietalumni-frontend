import React, {useState} from 'react';
import {connect} from "react-redux";
import {Form, Row, Col, Input, Button, Icon} from 'antd';
import FormError from "components/Errors";
import {setUsernamePassword} from "actions/newAlumniAction";
import ConfirmationMessage from "components/Registration/ConfirmationMessage";


const ConfirmationForm = Form.create({name: 'alumni_username_set'})(
    ({form, onSetUsername, search}) => {
        const [success, setSuccess] = useState(false);
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState(null);

        const confirmPassword = (rule, value, callback) => {
            let password = form.getFieldValue('password');
            if (value !== password) callback('confirm password not match.'); else callback();
        };

        const handleSubmit = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    onSetUsername(values).then(res => {
                        if (res) {
                            setData(res);
                            setSuccess(true);
                        }
                        setLoading(false);
                    })
                }
            });
        };

        const {getFieldDecorator, resetFields} = form;
        return (
            <>
                <ConfirmationMessage visible={success} data={data}/>
                <Form onSubmit={handleSubmit} style={{maxWidth: 800}}>
                    <FormError form={form} formName="alumni_username_set"/>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item label={'Email'} style={{marginBottom: 0}}>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {required: true, message: 'Please enter your registered email-id!',},
                                        {type: 'email', message: 'The input is not valid e-mail!'},
                                    ],
                                })(<Input placeholder="Enter registered email-id"/>)}
                            </Form.Item>

                            <Form.Item label={'Username'} style={{marginBottom: 0}}>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: 'Please enter your new username!'}],
                                })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                          placeholder="Enter new username"/>)}
                            </Form.Item>
                            <Form.Item label={'Password'} style={{marginBottom: 0}}>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please enter your new Password!'}],
                                })(<Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Enter new Password"/>)}
                            </Form.Item>
                            <Form.Item label={'Confirm Password'} style={{marginBottom: 0}}>
                                {getFieldDecorator('confirm_password', {
                                    rules: [{required: true, message: 'Please enter confirm Password!'},
                                        {validator: (a, b, c) => confirmPassword(a, b, c)}
                                    ],
                                })(<Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Confirm Password"/>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('token', {
                                    initialValue: new URLSearchParams(search).get('token'),
                                    rules: [{required: true, message: 'Invalid Url!'}],
                                })(<Input type={'hidden'}/>)}
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Confirm Registration
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={() => resetFields()}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        )
    }
);


const mapStateToProps = (state) => ({
    search: state.router.location.search
});

const mapDispatchToProps = (dispatch) => ({
    onSetUsername: e => dispatch(setUsernamePassword(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationForm);


