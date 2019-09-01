import React, {Component} from 'react';
import {Avatar, Button, Card, Col, Form, Icon, Input, Modal, Radio, Row, Switch, Tooltip, Upload} from "antd";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    placeholder: {
        '&::-webkit-input-placeholder': {
            // paddingTop: 8,
            fontSize: 'initial'
        },
        '&::-moz-placeholder': {
            // paddingTop: 8,
            fontSize: 'initial'
        },
        '&:-ms-input-placeholder': {
            // paddingTop: 8,
            fontSize: 'initial'
        },
        '&:-moz-placeholder': {
            // paddingTop: 8,
            fontSize: 'initial'
        },
        border: 'unset',
        padding: '4px',
        marginBottom: 32,

    },
    antUploadItem: {
        '& .ant-upload-list-item': {
            width: 80,
            height: 80,
            padding: 2,
        }
    }
});

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const NewPost = Form.create({name: 'new_post_alumni'})(
    class extends Component {
        state = {
            previewVisible: false,
            previewImage: '',
        };

        handleCancel = () => this.setState({previewVisible: false});

        handlePreview = async file => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }

            this.setState({
                previewImage: file.url || file.preview,
                previewVisible: true,
            });
        };

        render() {
            const {previewVisible, previewImage} = this.state;
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            const {classes} = this.props;
            return (
                <div>

                    <Card
                        bodyStyle={{
                            padding: 8
                        }}
                    >
                        <Row>
                            <Col span={2}>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            </Col>
                            <Col span={22}>

                                <Form layout="vertical">

                                    <Form.Item style={{marginBottom: 0}}>
                                        {getFieldDecorator('description')(
                                            <Input.TextArea
                                                className={classes.placeholder}
                                                placeholder="Write something to SLIET Alumni Association Post . . ."
                                                style={{margin: '4px 0 16px'}}
                                                autosize={{minRows: 2}}
                                            />
                                        )}
                                    </Form.Item>


                                    <Form.Item style={{marginBottom: 0, display: 'inline-block'}}>
                                        {getFieldDecorator('image', {
                                            // valuePropName: 'fileList',
                                            // getValueFromEvent: this.normFile,
                                        })(
                                            <Upload
                                                className={classes.antUploadItem}
                                                // listType={"picture-card"}
                                                multiple
                                                onPreview={this.handlePreview}>
                                                <div>
                                                    <Button shape="circle" icon="camera"/>
                                                </div>
                                            </Upload>
                                        )}
                                    </Form.Item>

                                    {/*<Tooltip title="Add Image" placement={"right"}>*/}
                                    {/*    <Button shape="circle" icon="camera"/>*/}
                                    {/*</Tooltip>*/}

                                    <Button style={{float: 'right'}} type="primary">
                                        Post
                                    </Button>

                                    {/*<Switch*/}
                                    {/*    checkedChildren="Public"*/}
                                    {/*    unCheckedChildren="Private"*/}
                                    {/*    defaultChecked*/}
                                    {/*    size={"small"}*/}
                                    {/*    style={{float: 'right', margin: 8}}*/}
                                    {/*/>*/}

                                    <Form.Item style={{float: 'right', marginBottom: 0}}>
                                        {getFieldDecorator('private', {
                                            initialValue: true,
                                            valuePropName: 'checked'
                                        })(
                                            <Switch
                                                checkedChildren="Public"
                                                unCheckedChildren="Private"
                                                size={"small"}
                                                style={{margin: 8}}
                                            />
                                        )}
                                    </Form.Item>

                                </Form>

                            </Col>
                        </Row>
                    </Card>


                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>
                </div>
            );
        }
    }
);

class NewPostkk extends Component {
    state = {
        visible: true,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCreate = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Card
                    bodyStyle={{
                        padding: 8
                    }}
                >
                    <Row>
                        <Col span={2}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                        </Col>
                        <Col span={22}>
                            <Input.TextArea
                                className={classes.placeholder}
                                style={{margin: '4px 0'}}
                                autosize={{minRows: 2}}
                                placeholder="Write something to SLIET Alumni Association Post . . ."
                            />
                            <Tooltip title="Add Image" placement={"right"}>
                                <Button shape="circle" icon="camera"/>
                            </Tooltip>

                            <Button style={{float: 'right'}} type="primary">
                                Post
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(NewPost);
