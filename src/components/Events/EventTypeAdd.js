import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {Button, Modal, Form, Input} from 'antd';
import FormError from "components/Errors";

const CollectionCreateForm = Form.create({name: 'new_event_type'})(
    class extends Component {
        render() {
            const {visible, onCancel, onCreate, form, loading} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="New Event Type"
                    okText="Add"
                    onCancel={onCancel}
                    onOk={onCreate}
                    maskClosable={false}
                    confirmLoading={loading}
                >
                    <Form>
                        <FormError form={form} formName="new_event_type"/>
                        <Form.Item label="Event Type Title" style={{marginBottom: 0}}>
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'Please enter event type title!'}],
                            })(<Input placeholder="Enter event type title"/>)}
                        </Form.Item>

                        <Form.Item label="Event Type" style={{marginBottom: 0}}>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Please enter unique event type!'}],
                            })(<Input placeholder="Enter unique event type"/>)}
                        </Form.Item>

                        <Form.Item label="Description" style={{marginBottom: 8}}>
                            {getFieldDecorator('description', {
                                rules: [{required: true, message: 'Please enter event type description!'}],
                            })(<Input.TextArea autoSize placeholder="Enter event type description"/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class EventTypeAdd extends Component {
    state = {
        visible: false,
        loading: false,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
        this.formRef.props.form.resetFields();
    };

    handleCreate = () => {
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                this.props.onAdd(values).then(res => {
                    if (res) this.handleCancel();
                    this.setState({loading: false});
                });
            }
        });
    };

    render() {
        return (
            <>
                <Button type="primary" style={{marginLeft: 8}} onClick={this.showModal}>
                    Add New Event Type
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={formRef => this.formRef = formRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    loading={this.state.loading}
                />
            </>
        );
    }
}

EventTypeAdd.propTypes = {
    onAdd: PropTypes.func.isRequired,
};

export default EventTypeAdd
