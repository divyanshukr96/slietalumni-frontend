import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Row, Col, Input, Button, Icon} from 'antd';
import FormError from "components/Errors";
import {setUsernamePassword} from "actions/newAlumniAction";
import RegisterConfirmationMessage from "components/Alumni Registration/RegisterConfirmationMessage";


class RegisterConfirmationForm extends Component {
    state = {
        success: false,
        data: null
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) this.props.onSetUsername(values).then(res => {
                if (res) this.setState({success: true, data: res})
            })
        });
    };

    render() {
        const {getFieldDecorator, resetFields} = this.props.form;
        const {success, data} = this.state;
        return (
            <>
                <RegisterConfirmationMessage visible={success} data={data}/>
                <Form onSubmit={this.handleSubmit} style={{maxWidth: 800}}>
                    <FormError form={this.props.form}/>
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
                            <Form.Item>
                                {getFieldDecorator('token', {
                                    initialValue: new URLSearchParams(this.props.search).get('token'),
                                    rules: [{required: true, message: 'Invalid Url!'}],
                                })(<Input type={'hidden'}/>)}
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">
                                Confirm Registration
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
}


const mapStateToProps = (state) => ({
    search: state.router.location.search
});
const mapDispatchToProps = (dispatch) => ({
    onSetUsername: e => dispatch(setUsernamePassword(e))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create({name: 'reg_conf'})(RegisterConfirmationForm));


