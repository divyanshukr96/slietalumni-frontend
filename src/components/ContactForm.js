import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Button, Divider, Form, Input} from "antd";

const {TextArea} = Input;

const styles = () => ({
    form: {
        maxWidth: '100%',
        width: 400,
        margin: 'auto'
    }
});

class ContactUsForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {classes} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Form onSubmit={this.handleSubmit} className={classes.form}>
                    <Divider/>
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
                            rules: [{required: true, message: 'Please enter your email address!'}],
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
                                      autosize={{minRows: 3, maxRows: 6}}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

const ContactForm = Form.create({name: 'contact_form'})(ContactUsForm);

export default withStyles(styles)(ContactForm);