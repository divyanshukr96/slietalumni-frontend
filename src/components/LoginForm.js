import React from 'react';
import {connect} from "react-redux";
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import {Link, Redirect} from "react-router-dom";
import {login} from 'actions/authAction'
import FormError from "components/Errors";


class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        const {form, history} = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) this.props.onLogin(values).then(res => {
                if (res) history.push('/profile')
            });
        });
    };

    render() {
        const {form, loading, isAuthenticated} = this.props;
        const {getFieldDecorator} = form;
        if (isAuthenticated) return <Redirect to="/profile"/>;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={{maxWidth: 800}}>
                <FormError form={form}/>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please enter your email / username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Email / Username"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please enter your Password!'}],
                    })(
                        <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Password"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Link to={'/login'} style={{float: 'right'}}>Forgot password</Link>
                    <Button loading={loading} type="primary" htmlType="submit" className="login-form-button"
                            style={{width: '100%'}}>
                        Log in
                    </Button>
                    Or <Link to={'/register'}> register now </Link>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);

const mapStateToProps = ({auth}) => ({
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
});

const mapDispatchToProps = dispatch => ({
    onLogin: data => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);