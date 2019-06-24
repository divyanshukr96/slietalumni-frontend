import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {Button, Form, Input, Icon, Row, Col, DatePicker, TimePicker, Select} from 'antd';
import BraftEditor from "braft-editor";
import 'braft-editor/dist/index.css'
import FormError from "components/Errors";
import FileUploadButton from "components/Alumni Registration/FileUploadButton";
import moment from "moment";

const autoSave = (props, changedValues, allValues) => {
    if (props.form.isFieldTouched('content')) {
        allValues = {...allValues, content: allValues.content.toHTML()}
    }
    sessionStorage.setItem('newEvent', JSON.stringify(allValues))
}

class EventForm extends Component {

    componentDidMount() {
        this.setFields();
    }

    setFields = async () => {
        let newEvent = await this.props.data.title ? this.props.data : JSON.parse(sessionStorage.getItem('newEvent'));
        if (!newEvent) return;
        try {
            // handle the props data set from localstorage
        } catch (e) {
            console.log(e)
        }
    };

    handleCancel = () => {
        sessionStorage.removeItem('newEvent');
        this.props.form.resetFields()
    }

    onSuccess = () => sessionStorage.removeItem('newEvent');

    render() {
        const {form: {getFieldDecorator}, edit, data, eventTypes} = this.props;
        return (
            <Form>
                <FormError form={this.props.form}/>
                <Form.Item label="Event Title" style={{marginBottom: 0}}>
                    {getFieldDecorator('title', {
                        initialValue: data.title,
                        rules: [{required: true, message: 'Event title field is required!'}],
                    })(<Input placeholder="Enter event title"/>)}
                </Form.Item>

                <Form.Item label="Description" style={{marginBottom: 8}}>
                    {getFieldDecorator('description', {
                        initialValue: data.description,
                        rules: [{required: true, message: 'Event description field is required!'}],
                    })(<Input.TextArea placeholder="Enter event description" autosize/>)}
                </Form.Item>

                <Row gutter={8}>
                    <Col sm={12}>
                        <FileUploadButton
                            label={'Event Photo'} name={'image'}
                            formProps={this.props.form}
                            itemProps={{
                                labelCol: {span: 9, style: {textAlign: 'left'}},
                                wrapperCol: {span: 15},
                            }}
                            decoratorProps={{rules: [{required: !edit, message: 'Please select event image!'}]}}
                            uploadProps={{
                                accept: 'image/*', ...(data && data.image && {
                                    listType: 'picture', defaultFileList: [{
                                        uid: new Date().toLocaleString(),
                                        name: data.image,
                                        status: 'done',
                                        thumbUrl: data.image_thumb,
                                    }]
                                })
                            }}
                            style={{marginBottom: 0}}
                        >
                            <Button><Icon type="file-image"/> Select event photo</Button>
                        </FileUploadButton>
                    </Col>
                    <Col sm={12}>
                        <Form.Item
                            label="Event Type"
                            style={{marginBottom: 0}}
                            labelCol={{sm: 7, style: {textAlign: 'left'}}}
                            wrapperCol={{sm: 17}}
                        >
                            {getFieldDecorator('event', {
                                initialValue: data.event,
                                rules: [{required: true, message: 'Event type field is required!'}],
                            })(<Select placeholder="Select event type" showSearch>
                                {eventTypes.map(row =>
                                    <Select.Option key={row.id} value={row.name}>{row.title}</Select.Option>)}
                            </Select>)}
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Event Content" style={{marginBottom: 0}}>
                    {getFieldDecorator('content', {
                        validateTrigger: 'onBlur',
                        initialValue: BraftEditor.createEditorState(data.content),
                        // rules: [{
                        //     required: true,
                        //     validator: (_, value, callback) => {
                        //         if (!value || value.isEmpty()) {
                        //             callback('Event content field is required!')
                        //         } else {
                        //             callback()
                        //         }
                        //     }
                        // }],
                    })(<BraftEditor
                        language="en"
                        className="ant-card-bordered"
                        placeholder="Enter event content here . . ."
                        contentStyle={{height: 350}}
                    />)}
                </Form.Item>

                <Form.Item label="Event Venue" style={{marginBottom: 0}}>
                    {getFieldDecorator('venue', {
                        initialValue: data.venue,
                        rules: [{required: true, message: 'Please enter event venue!'}],
                    })(<Input placeholder="Enter event venue"/>)}
                </Form.Item>

                <Row gutter={4}>
                    <Col span={12}>
                        <Form.Item label="Event Date" style={{marginBottom: 0}}>
                            {getFieldDecorator('date', {
                                ...(data.date && {initialValue: moment(data.date, 'D MMM YYYY')}),
                                rules: [{required: true, message: 'Please select event date!'}],
                            })(<DatePicker format="DD-MM-YYYY" placeholder="Select event date"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Event Time" style={{marginBottom: 8}}>
                            {getFieldDecorator('time', {
                                ...(data.time && {initialValue: moment(data.time, 'HH:mm:ss')}),
                                rules: [{required: true, message: 'Please select event time!'}],
                            })(<TimePicker format="HH:mm" placeholder="Select event time" style={{width: 'unset'}}/>)}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

EventForm.propTypes = {
    eventTypes: PropTypes.array.isRequired,
    data: PropTypes.object,
    edit: PropTypes.bool,
};

EventForm.defaultProps = {
    data: {},
};

export default Form.create({
    name: 'new_event',
    // onValuesChange: autoSave
})(EventForm);