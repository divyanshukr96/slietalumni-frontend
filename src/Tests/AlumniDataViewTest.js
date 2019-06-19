import React, {Component} from 'react';
import {Col, Form, Input, Modal, Row, Select, Typography} from "antd";
import * as PropTypes from "prop-types";
import * as _ from 'lodash'

const {Text} = Typography;

const EditableContext = React.createContext();

const Programme = [
    {
        value: 'Certificate',
        label: 'Certificate'
    },
    {
        value: 'Diploma',
        label: 'Diploma'
    },
    {
        value: 'ICD',
        label: 'Integrated Certificate Diploma'
    },
    {
        value: 'B.E',
        label: 'Bachelor of Engineering'
    }
];
const Branch = [
    {
        value: 'CSE',
        label: 'Computer Science Engineering'
    },
    {
        value: 'ECE',
        label: 'Electronics and Communication Engineering'
    }
];

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

// <Form.Item label={label} style={{margin: 0}}>
// <Text strong className="ant-form-text" >{data[name]}</Text>
// </Form.Item>

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
    inputType: PropTypes.oneOf(['text', 'select'])
};

class AlumniDataTable extends Component {
    state = {
        edit: false,
    };

    onEdit = () => this.setState(s => ({edit: !s.edit}));

    onSave = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) console.log(values)
        });
    };

    render() {
        const {props, state: {edit}} = this;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return (
            <Modal
                visible={true}
                title="Add new Alumni Data"
                okText={edit ? 'Save' : 'Edit'}
                cancelText={edit ? 'Cancel' : 'Close'}
                onOk={edit ? this.onSave : this.onEdit}
                onCancel={edit ? this.onEdit : ''}
            >
                <EditableContext.Provider value={this.props.form}>
                    <Form {...formItemLayout}>
                        <EditableCell edit={edit} name="name" label="Name" options={{
                            rules: [{required: true, message: 'Alumni name field is required!'}],
                        }} placeholder="Enter full name" {...props}/>
                        <EditableCell edit={edit} name="email" label="E-mail" options={{
                            rules: [{type: 'email', message: 'The input is not valid E-mail!'}]
                        }} placeholder="Enter Alumni e-mail id" {...props}/>
                        <EditableCell edit={edit} name="mobile" label="Mobile"
                                      placeholder="Enter mobile number" {...props}/>
                        <EditableCell edit={edit} name="programme" label="Programme" inputProps={
                            <Select placeholder="Select programme">
                                {Programme.map(row =>
                                    <Select.Option key={row.value} value={row.value}>{row.label}</Select.Option>)}
                            </Select>
                        } {...props}/>
                        <EditableCell edit={edit} name="branch" label="Branch" inputProps={
                            <Select placeholder="Select branch">
                                {Branch.map(row =>
                                    <Select.Option key={row.value} value={row.value}>{row.label}</Select.Option>)}
                            </Select>
                        } {...props}/>
                        <EditableCell edit={edit} name="batch" label="Batch" inputProps={
                            <Select placeholder="Select batch" showSearch>
                                {_.range(new Date().getFullYear() - 3, 1985).map(row =>
                                    <Select.Option key={row} value={row}>{row}</Select.Option>)}
                            </Select>
                        } {...props}/>
                        <EditableCell edit={edit} name="passing" label="Passing Year" inputProps={
                            <Select placeholder="Select passing year" showSearch>
                                {_.range(new Date().getFullYear(), 1985).map(row =>
                                    <Select.Option key={row} value={row}>{row}</Select.Option>)}
                            </Select>
                        } {...props}/>
                        <EditableCell edit={edit} name="organisation" label="Organisation"
                                      placeholder="Enter current organisation" {...props}/>
                    </Form>
                </EditableContext.Provider>
            </Modal>
        );
    }
}

const AlumniDataView = Form.create()(AlumniDataTable);


export default AlumniDataView;