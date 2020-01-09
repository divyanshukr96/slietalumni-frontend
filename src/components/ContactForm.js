import React, {useState} from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {Button, Divider, Form, Input, Modal} from "antd";
import {contactUs} from "../actions/publicAction";
import FormError from "./Errors";

const {TextArea} = Input;

const styles = () => ({
    form: {
        maxWidth: '100%',
        width: 400,
        margin: 'auto'
    }
});

const ContactForm = Form.create({name: 'contact_form'})(
    ({classes, form, onContact}) => {

        const [loading, setLoading] = useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    onContact(values).then(res => {
                        if (res) {
                            form.resetFields();
                            Modal.success({
                                // title: 'Your message is successfully submitted . . .',
                                content: 'Your enquiry is submitted successfully. We will contact you back shortly.',
                                centered: true,
                                okText: 'Close'
                            })
                        }
                        setLoading(false)
                    });
                }
            });
        };

        const {getFieldDecorator} = form;
        return (
            <>
                <Form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Divider/>
                    <FormError form={form} formName="contact_form"/>
                    <Form.Item
                        // validateStatus="error"
                        // help="Should be combination of numbers & alphabets"
                    >
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please enter your name!'}],
                        })(
                            <Input placeholder="Name"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                                {required: true, message: 'Please enter your email address!'},
                                {type: 'email', message: 'The entered mail is not valid e-mail!'},
                            ],
                        })(
                            <Input type="email" placeholder="Email address"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('subject', {
                            rules: [{required: true, message: 'Please enter the subject!'}],
                        })(
                            <Input placeholder="Subject"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('message', {
                            rules: [{required: true, message: 'Please enter your message / enquiry!'}],
                        })(
                            <TextArea placeholder="Write your message here!"
                                      autoSize={{minRows: 3, maxRows: 6}}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{width: '100%'}}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
);

const mapDispatchToProps = dispatch => ({
    onContact: (data) => dispatch(contactUs(data))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(ContactForm));
