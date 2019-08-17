import React, {Component} from 'react';
import {Button, Form, Icon, Input, Modal, Radio, Upload} from "antd";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const NewPostForm = Form.create({name: 'form_in_modal'})(
    class extends Component {
        state = {
            previewVisible: false,
            previewImage: '',
        };

        handleCancel = () => this.setState({ previewVisible: false });

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
            const { previewVisible, previewImage} = this.state;
            const {visible, onCancel, onCreate, form} = this.props;
            const {getFieldDecorator} = form;
            return (
                <div>
                    <Modal
                        visible={visible}
                        title="Create a new post"
                        okText="Create"
                        onCancel={onCancel}
                        onOk={onCreate}
                    >
                        <Form layout="vertical">
                            <Form.Item label="Title">
                                {getFieldDecorator('title', {
                                    rules: [{required: true, message: 'Please input the title of collection!'}],
                                })(<Input/>)}
                            </Form.Item>
                            <Form.Item label="Description">
                                {getFieldDecorator('description')(<Input.TextArea
                                    placeholder="Autosize height based on content lines" autosize={{minRows: 4}}/>)}
                            </Form.Item>


                            <Form.Item>
                                {getFieldDecorator('image', {
                                    // valuePropName: 'fileList',
                                    // getValueFromEvent: this.normFile,
                                })(
                                    <Upload  listType={"picture-card"} multiple onPreview={this.handlePreview}>
                                        <div>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">Upload</div>
                                        </div>
                                    </Upload>,
                                )}
                            </Form.Item>


                            <Form.Item className="collection-create-form_last-form-item">
                                {getFieldDecorator('modifier', {
                                    initialValue: 'public',
                                })(
                                    <Radio.Group>
                                        <Radio value="public">Public</Radio>
                                        <Radio value="private">Private</Radio>
                                    </Radio.Group>,
                                )}
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
            );
        }
    }
);

class NewPost extends Component {
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
        return (
            <div>
                <Button icon={'plus'} onClick={this.showModal} type={"primary"}>New Post</Button>
                <NewPostForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default NewPost;