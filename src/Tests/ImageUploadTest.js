import React, {Component} from 'react';
import {Button, Form, Icon, Upload} from "antd";
import axios from "axios";
import UploadComponenetTest from "Tests/UploadComponenetTest";

class ImageUploadTestForm extends Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values.image);
                let data = new FormData();
                data.append('image', values.image);
                axios.post('/api/alumni/register', data).then(res => console.log(res)).catch(err => console.log(err.response.data))
            }
        });
    };

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (e.fileList.length > 1) e.fileList.shift();
        if (e.fileList.length === 0) e.file = e.fileList[0];
        return e && e.fileList && e.file.originFileObj;
    };

    dummyRequest = ({onSuccess}) => {
        setTimeout(() => {
            onSuccess("success")
        }, 0);
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    {/*<div>*/}
                    {/*    <Form.Item label="Upload">*/}
                    {/*        {getFieldDecorator('image', {*/}
                    {/*            valuePropName: 'file',*/}
                    {/*            getValueFromEvent: this.normFile,*/}
                    {/*        })(*/}
                    {/*            <Upload name={'image'} customRequest={this.dummyRequest}>*/}
                    {/*                <Button><Icon type="upload"/> Click to upload</Button>*/}
                    {/*            </Upload>,*/}
                    {/*        )}*/}
                    {/*    </Form.Item>*/}
                    {/*</div>*/}
                    <UploadComponenetTest formProps={this.props.form} label={'Photo'} name={'image'}
                                          decoratorProps={{
                                              rules: [{required: true, message: 'Please enter your designation!'}],
                                          }}
                    >
                        <Button><Icon type="upload"/> Select to upload</Button>
                    </UploadComponenetTest>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

const ImageUploadTest = Form.create({name: 'validate_other'})(ImageUploadTestForm);

export default ImageUploadTest;