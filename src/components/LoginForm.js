import React from 'react';
import {connect} from "react-redux";
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import {Link} from "react-router-dom";
import {login} from 'actions/authAction'
import FormError from "components/Errors";


class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) this.props.onLogin(values)
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        // const {errors, form: {setFields, getFieldValue}} = nextProps;
        // if (!_(errors)) {
        //     Object.keys(errors).forEach(k => {
        //         console.log(errors[k]);
        //         setFields({
        //             [k]: {
        //                 value: getFieldValue(k),
        //                 errors: [new Error(errors[k])]
        //             }
        //         });
        //     });
        //     this.props.onClearError();
        // }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={{maxWidth: 800}}>
                <FormError form={this.props.form}/>
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
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                        Log in
                    </Button>
                    Or <Link to={'/register'}> register now </Link>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);

const mapDispatchToProps = dispatch => ({
    onLogin: data => dispatch(login(data)),
});

export default connect(null, mapDispatchToProps)(WrappedNormalLoginForm);