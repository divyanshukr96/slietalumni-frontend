import React, {Component} from 'react';
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {Button, Col, Form, Input, Modal, Row, Typography} from "antd";
import FormError from "components/Errors";

const {Text} = Typography;

const EditableContext = React.createContext();

class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputProps) {
            return this.props.inputProps;
        }
        return <Input placeholder={this.props.placeholder}/>;
    };
    renderCell = ({getFieldDecorator}) => {
        const {data, edit, label, name, options} = this.props;
        return edit ? (
            <Form.Item label={label} style={{margin: 0}}>
                {getFieldDecorator(name, {
                    ...options,
                    initialValue: data[name],
                })(this.getInput())}
            </Form.Item>
        ) : data[name] ? (
            <Row>
                <Col sm={8} xs={24} style={{padding: 4}}>{label} : </Col>
                <Col sm={16} xs={24} style={{padding: 4}}><Text strong>{data[name]}</Text></Col>
            </Row>
        ) : null
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

EditableCell.propTypes = {
    edit: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.object,
    inputProps: PropTypes.any
};

class EventTypeEdit extends Component {
    state = {
        edit: false,
        loading: false,
    };

    onEdit = () => this.setState(s => ({edit: !s.edit}));

    onSave = () => {
        const {form, data} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                this.props.onUpdate(data.id, values).then(res => {
                    if (res) this.onEdit();
                    this.setState({loading: false});
                });
            }
        });
    };


    render() {
        const {props, state: {edit}} = this;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return (
            <Modal
                visible={!_.isEmpty(this.props.data)}
                title="Event Type"
                okText={edit ? 'Save' : 'Edit'}
                cancelText={edit ? 'Cancel' : 'Close'}
                onOk={edit ? this.onSave : this.onEdit}
                onCancel={edit ? this.onEdit : () => this.props.onClose(null)}
                destroyOnClose={true}
                bodyStyle={{paddingBottom: 8}}
                maskClosable={false}
                confirmLoading={this.state.loading}
            >

                <EditableContext.Provider value={this.props.form}>
                    <Form {...formItemLayout}>
                        <FormError form={this.props.form} formName="event_type_update"/>

                        {edit ? <Form.Item label="Event Type" style={{marginBottom: 0}}>
                            <Input value={props.data.name} readOnly disabled/>
                        </Form.Item> : <EditableCell edit={edit} name="name" label="Event Type"
                                                     inputProps={<Input readOnly/>} {...props}/>}

                        <EditableCell edit={edit} name="title" label="Event Type Title" options={{
                            rules: [{required: true, message: 'Please enter event type title!'}],
                        }} placeholder="Enter full name" {...props}/>

                        <EditableCell edit={edit} name="description" label="Description" options={{
                            rules: [{required: true, message: 'Please enter event type description!'}],
                        }} inputProps={<Input.TextArea autoSize placeholder="Enter current organisation"/>} {...props}/>
                    </Form>
                </EditableContext.Provider>
                <div style={{textAlign: 'right'}}>
                    {edit || <Button type="danger" icon="delete" size={"small"} onClick={props.onDelete}>
                        Delete
                    </Button>}
                </div>
            </Modal>
        );
    }
}

EventTypeEdit.propTypes = {
    data: PropTypes.any.isRequired
};


export default Form.create({name: 'event_type_update'})(EventTypeEdit);
