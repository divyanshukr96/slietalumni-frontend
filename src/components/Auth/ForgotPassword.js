import React, {useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Form, Input, Modal, Result, Typography} from "antd";
import {forgotPassword} from 'actions/authAction'
import FormError from "../Errors";

const {Title} = Typography;

const ForgotPassword = Form.create({name: 'forgot_password'})(
    props => {

        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        const [success, setSuccess] = useState(null);

        const {form, onFormSubmit} = props;
        const {getFieldDecorator} = form;

        const handleSubmit = () => {
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    onFormSubmit(values).then(res => {
                        if (res) {
                            form.resetFields();
                            setSuccess(res.message)
                        }
                        setLoading(false);
                    });
                }
            });

        };

        const onCancel = () => {
            setOpen(false);
            setSuccess(null);
        };


        return (
            <>
                <Link to={'/login'} style={{float: 'right'}} onClick={() => setOpen(true)}>Forgot password</Link>

                <Modal
                    visible={open}
                    title={!success && "Reset Password"}
                    footer={<Button onClick={onCancel}>Close</Button>}
                    width={400}
                    closable={false}
                    destroyOnClose
                >

                    {success ? <Result status="success" subTitle={<Title level={4}>{success}</Title>}
                    /> : <Form layout="vertical">
                        <FormError form={form} formName="forgot_password"/>
                        <Form.Item label="Registered Email Address">
                            {getFieldDecorator('email', {
                                validateTrigger: "onBlur",
                                rules: [
                                    {required: true, message: 'Enter your registered e-mail address!'},
                                    {type: 'email', message: 'Entered input is not a valid e-mail!'},
                                ],
                            })(<Input placeholder="Enter Registered Email address"/>)}
                        </Form.Item>
                        <div style={{textAlign: 'right'}}>
                            <Button loading={loading} type="primary" htmlType="submit" onClick={handleSubmit}>
                                Send Password Reset Link
                            </Button>
                        </div>
                    </Form>}

                </Modal>
            </>
        );
    }
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onFormSubmit: data => dispatch(forgotPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
