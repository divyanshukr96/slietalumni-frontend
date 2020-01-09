import React from 'react';
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {Link, Redirect} from "react-router-dom";
import {login} from 'actions/authAction'
import FormError from "components/Errors";
import ForgotPassword from "./ForgotPassword";


const LoginForm = Form.create({name: 'login_form'})(
    class extends React.Component {
        handleSubmit = (e) => {
            const {form, history, redirect} = this.props;
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) this.props.onLogin(values).then(res => {
                    if (res && redirect) history.push('/profile')
                });
            });
        };

        render() {
            const {form, loading, redirect, isAuthenticated} = this.props;
            const {getFieldDecorator} = form;
            if (isAuthenticated && redirect) return <Redirect to="/profile"/>;
            return (
                <Form onSubmit={this.handleSubmit} className="login-form" style={{maxWidth: 800}}>
                    <FormError form={form} formName="login_form"/>
                    <Form.Item style={{marginBottom: 8}}>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please enter your email / username!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Email / Username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please enter your Password!'}],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item style={{marginBottom: 8}}>
                        {getFieldDecorator('remember_me', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <ForgotPassword/>

                        <Button
                            loading={loading}
                            onClick={this.handleSubmit}
                            type="primary" block
                            htmlType="submit" className="login-form-button"
                        >
                            Log in
                        </Button>
                        Or <Link to={'/register'}> Register Now </Link>
                    </Form.Item>
                </Form>
            );
        }
    }
);


LoginForm.propTypes = {
    redirect: PropTypes.bool
};

LoginForm.defaultProps = {
    redirect: true
};

const mapStateToProps = ({auth}) => ({
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
});

const mapDispatchToProps = dispatch => ({
    onLogin: data => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
