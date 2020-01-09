import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {Button, Form, Input, Icon} from 'antd';
import BraftEditor from "braft-editor";
import 'braft-editor/dist/index.css'
import FormError from "components/Errors";
import FileUploadButton from "components/Registration/FileUploadButton";

// const autoSave = (props, changedValues, allValues) => {
//     if (props.form.isFieldTouched('content')) {
//         allValues = {...allValues, content: allValues.content.toHTML()}
//     }
//     sessionStorage.setItem('newNews', JSON.stringify(allValues))
// };

class NewsCreateForm extends Component {

    componentDidMount() {
        let newNews = this.props.data ? this.props.data : JSON.parse(sessionStorage.getItem('newNews'));
        if (!newNews) return null;
        // handle the props data set from localstorage
    }

    handleCancel = () => {
        sessionStorage.removeItem('newNews');
        this.props.form.resetFields()
    };

    onSuccess = () => sessionStorage.removeItem('newNews');

    render() {
        const {form: {getFieldDecorator}, edit, data} = this.props;
        return (
            <Form>
                <FormError form={this.props.form} formName="add_new_news"/>
                <Form.Item label="News Title" style={{marginBottom: 0}}>
                    {getFieldDecorator('title', {
                        initialValue: data.title,
                        rules: [{required: true, message: 'News title field is required!'}],
                    })(<Input placeholder="Enter news title"/>)}
                </Form.Item>

                <Form.Item label="Description" style={{marginBottom: 8}}>
                    {getFieldDecorator('description', {
                        initialValue: data.description,
                        rules: [{required: true, message: 'News description field is required!'}],
                    })(<Input.TextArea placeholder="Enter news description" autoSize/>)}
                </Form.Item>

                <FileUploadButton
                    label={'Cover Photo'} name={'cover'}
                    formProps={this.props.form}
                    itemProps={{
                        labelCol: {span: 4, style: {textAlign: 'left'}},
                        wrapperCol: {span: 20},
                    }}
                    decoratorProps={{rules: [{required: !edit, message: 'Please select news cover photo!'}]}}
                    uploadProps={{
                        accept: 'image/*', ...(data && data.cover && {
                            listType: 'picture', defaultFileList: [{
                                uid: new Date().toLocaleString(),
                                name: data.cover,
                                status: 'done',
                                thumbUrl: data.cover_thumb,
                            }]
                        })
                    }}
                    style={{marginBottom: 8}}
                >
                    <Button><Icon type="file-image"/> Select photo</Button>
                </FileUploadButton>

                <Form.Item label="News Content" style={{marginBottom: 8}}>
                    {getFieldDecorator('content', {
                        validateTrigger: 'onBlur',
                        initialValue: BraftEditor.createEditorState(data.content),
                        rules: [{
                            required: true,
                            validator: (_, value, callback) => {
                                if (!value || value.isEmpty()) {
                                    callback('News content field is required!')
                                } else {
                                    callback()
                                }
                            }
                        }],
                    })(<BraftEditor
                        language="en"
                        className="ant-card-bordered"
                        placeholder="Enter news content here . . ."
                    />)}
                </Form.Item>
            </Form>
        );
    }
}

NewsCreateForm.propTypes = {
    data: PropTypes.object,
    edit: PropTypes.bool,
};

NewsCreateForm.defaultProps = {
    data: {}
};

export default Form.create({
    name: 'add_new_news',
    // onValuesChange: autoSave
})(NewsCreateForm);
