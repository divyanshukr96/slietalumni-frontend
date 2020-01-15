import React from 'react';
import {DatePicker, Form} from "antd";
import BraftEditor from "braft-editor";
import 'braft-editor/dist/index.css'
import moment from "moment";
import FormError from "../Errors";

const PublicNoticeForm = ({form, data = {}}) => {
    const {getFieldDecorator} = form;

    return (
        <>
            <FormError form={form} formName="public_notice_save"/>
            <Form.Item style={{marginBottom: 8}}>
                {getFieldDecorator('notice', {
                    validateTrigger: 'onBlur',
                    initialValue: BraftEditor.createEditorState(data.notice),
                })(<BraftEditor
                    language="en"
                    className="ant-card-bordered"
                    placeholder="Enter notice content here . . ."
                    contentStyle={{height: 350}}
                />)}
            </Form.Item>

            <Form.Item style={{marginBottom: 0}}>
                {getFieldDecorator('notice_till', {
                    ...(data.notice_till && {initialValue: moment(data.notice_till, 'D MMM YYYY')}),
                    rules: [{required: true, message: 'Notice expire date is required!'}],
                })(<DatePicker
                    format="DD-MM-YYYY"
                    placeholder="Select notice expire date"
                    style={{width: 220}}
                    disabledDate={current => {
                        if (!data.notice_till)
                            return current < moment();
                    }}
                />)}
            </Form.Item>
        </>
    );
};

export default PublicNoticeForm;
