import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import {Form, Input} from "antd";

const styles = theme => ({});

class InputField extends Component {
    render() {
        const {classes, field} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Form.Item
                    // validateStatus="error"
                    // help="Should be combination of numbers & alphabets"
                >
                    {getFieldDecorator(field.name, {
                        rules: [{required: true, message: 'Please enter your name!'}],
                    })(
                        <Input placeholder={field.placeholder}/>
                    )}
                </Form.Item>
            </>
        );
    }
}

InputField.propTypes = {
    classes: PropTypes.object.isRequired,
};

InputField.defaultProps = {
    field: {
        name: 'undefined', //required
        label: null,
        placeholder: null,
    }
};

export default withStyles(styles)(InputField);