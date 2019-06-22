import React, {Component} from 'react';
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {Badge, Button, Checkbox, Col, Divider, Form, Input, Modal, Row, Select, Typography} from "antd";
import FormError from "components/Errors";

const {Text, Title} = Typography;

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
                <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>{label} : </Col>
                <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{data[name]}</Text></Col>
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

class UserDetails extends Component {
    state = {
        edit: false,
    };

    onEdit = () => this.setState(s => ({edit: !s.edit}));

    onSave = () => {
        const {form, data} = this.props;
        form.validateFields((err, values) => {
            if (!err) this.props.onUserUpdate(data.id, values).then(res => {
                if (res) this.onEdit()
            });
        });
    };

    render() {
        const {props, state: {edit}} = this;
        const {data, form: {getFieldDecorator, isFieldsTouched}, rolesList} = props;
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
                title="User Details"
                okText={edit ? 'Update' : 'Edit'}
                cancelText={edit ? 'Cancel' : 'Close'}
                onOk={edit && isFieldsTouched()? this.onSave : this.onEdit}
                onCancel={edit ? this.onEdit : () => this.props.onClose(null)}
                destroyOnClose={true}
                bodyStyle={{paddingBottom: 8}}
            >
                <EditableContext.Provider value={this.props.form}>
                    <Row>
                        <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>Name : </Col>
                        <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{data.name}</Text></Col>

                        <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>E-mail : </Col>
                        <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{data.email}</Text></Col>

                        <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>Mobile : </Col>
                        <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{data.mobile}</Text></Col>

                        <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>Username : </Col>
                        <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{data.username}</Text></Col>
                    </Row>
                    <Divider style={{marginBottom: 0}}/>
                    <Title level={4}>Roles :-</Title>

                    <Form {...formItemLayout}>
                        <FormError form={this.props.form}/>

                        <Form.Item label={'User Roles'} style={{marginBottom: 8}} >
                            {getFieldDecorator('roles', {
                                initialValue: data.roles,
                            })(<Select placeholder="Select user roles" showSearch mode={"multiple"} disabled={!edit}>
                                {rolesList.map(row =>
                                    <Select.Option key={row.id} value={row.name} >{row.display_name}</Select.Option>)}
                            </Select>)}
                        </Form.Item>

                        {edit ? (
                            <Form.Item label={'User Status'} style={{marginBottom: 8}}>
                                {getFieldDecorator('active', {
                                    valuePropName: 'checked', initialValue: data.active,
                                })(<Checkbox>Active</Checkbox>)}
                            </Form.Item>
                        ) : (
                            <Row>
                                <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>User Status : </Col>
                                <Col sm={16} xs={14} style={{padding: 8}}><Text strong>
                                    {data.active ? <span><Badge status="success"/>Active</span> :
                                        <span><Badge status="error"/>Inactive</span>}
                                </Text></Col>
                            </Row>
                        )}

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

UserDetails.propTypes = {
    data: PropTypes.any.isRequired
};

export default Form.create()(UserDetails);