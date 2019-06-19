import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {Form, Upload} from "antd";

class UploadComponenetTest extends Component {

    normFile = (e) => {
        if (Array.isArray(e)) return e;

        if (e.fileList.length > 1) e.fileList.shift();

        if (e.fileList.length === 0) e.file.originFileObj = e.fileList[0];

        return e && e.fileList && e.file.originFileObj;
    };

    dummyRequest = ({onSuccess}) => setTimeout(() => onSuccess("success"), 0);

    render() {
        const {formProps: {getFieldDecorator}, uploadProps, itemProps, decoratorProps, children, label, name} = this.props;
        return (
            <Form.Item label={label} {...itemProps}>
                {getFieldDecorator(name, {
                    valuePropName: 'file',
                    getValueFromEvent: this.normFile,
                    ...decoratorProps
                })(
                    <Upload customRequest={this.dummyRequest} {...uploadProps}>
                        {children}
                    </Upload>,
                )}
            </Form.Item>
        );
    }
}

UploadComponenetTest.propTypes = {
    formProps: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    decoratorProps: PropTypes.object,
    uploadProps: PropTypes.object,
    itemProps: PropTypes.object,
};

export default UploadComponenetTest;

