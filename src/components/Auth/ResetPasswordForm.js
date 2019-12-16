import React, {useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as _ from "lodash";
import {
    Form, Icon, Input, Button, Modal, Result, Typography,
} from 'antd';
import {resetPassword} from 'actions/authAction'
import FormError from "components/Errors";


const {Paragraph, Title} = Typography;

const SuccessMessage = withRouter(({visible, data, history}) => {
        return (
            <Modal visible={visible} footer={null} closable={false} width={400}>
                <Result
                    status="success"
                    subTitle={
                        <>
                            <Title level={4}>{data}</Title>
                            <Paragraph>
                                Now you can login to SLIET Alumni Association using new password.
                            </Paragraph>
                        </>
                    }
                    extra={[
                        <Button type="primary" key="login" onClick={() => history.replace('/login')}>
                            Login
                        </Button>
                    ]}
                />
            </Modal>
        )
    }
);


const ResetPasswordForm = Form.create({name: 'normal_login'})(
    props => {

        const {form, loading, onReset} = props;

        const [token] = useState(props.match.params.token);
        const [success, setSuccess] = useState(null);

        const handleSubmit = (e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) onReset(values).then(res => {
                    if (res) {
                        form.resetFields();
                        setSuccess(res.message)
                    }
                });
            });
        };


        const {getFieldDecorator} = form;
        return (
            <>
                <SuccessMessage visible={!_.isEmpty(success)} data={success}/>
                <Form onSubmit={handleSubmit} className="password-reset-form" style={{maxWidth: 800}}>
                    <FormError form={form}/>
                    <Form.Item style={{marginBottom: 12}}>
                        {getFieldDecorator('token', {
                            initialValue: token
                        })(
                            <Input hidden={true} disabled/>
                        )}
                    </Form.Item>
                    <Form.Item style={{marginBottom: 12}}>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: 'Please enter your registered email!'}],
                        })(
                            <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Registered Email"/>
                        )}
                    </Form.Item>
                    <Form.Item style={{marginBottom: 12}}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please enter your Password!'}],
                        })(
                            <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password_confirmation', {
                            rules: [{required: true, message: 'Please enter your Password!'}],
                        })(
                            <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="Confirm Password"/>
                        )}
                    </Form.Item>
                    <Form.Item>

                        <Button loading={loading} type="primary" htmlType="submit"
                                style={{width: '100%'}}>
                            Password Reset
                        </Button>

                    </Form.Item>
                </Form>
            </>
        );
    }
);


const mapStateToProps = ({auth}) => ({
    loading: auth.loading,
});

const mapDispatchToProps = dispatch => ({
    onReset: data => dispatch(resetPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
