import React, {Component} from 'react';
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {Button, Col, Form, Icon, Input, Modal, Row, Select, Typography} from "antd";
import {Programme, Branch} from 'Constants/ProgrammeAndBranch'
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

class AlumniDataViewForm extends Component {
    state = {
        edit: false,
    };

    onEdit = () => this.setState(s => ({edit: !s.edit}));

    onSave = () => {
        const {form, data} = this.props;
        form.validateFields((err, values) => {
            if (!err) this.props.onUpdate(data.id, values).then(res => {
                if (res) this.onEdit()
            });
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
                visible={!_.isEmpty(this.props.data)}
                title="Alumni Data"
                okText={edit ? 'Save' : 'Edit'}
                cancelText={edit ? 'Cancel' : 'Close'}
                onOk={edit ? this.onSave : this.onEdit}
                onCancel={edit ? this.onEdit : () => this.props.onClose(null)}
                destroyOnClose={true}
                bodyStyle={{paddingBottom: 8}}
            >

                <a href={`/sac/alumni-database/${props.data.id}`}
                   style={{position: "absolute", right: 24, marginTop: -16}}>
                    <Icon type="fullscreen" style={{fontSize: '1.2rem'}}/>
                </a>

                <EditableContext.Provider value={this.props.form}>
                    <Form {...formItemLayout}>
                        <FormError form={this.props.form}/>
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
                                <Select.Option key="programme" value={null}>None</Select.Option>
                                {Programme.map(row =>
                                    <Select.Option key={row.value} value={row.value}>{row.text}</Select.Option>)}
                            </Select>
                        } {...props}/>

                        <EditableCell edit={edit} name="branch" label="Branch" inputProps={
                            <Select placeholder="Select branch">
                                <Select.Option key="branch" value={null}>None</Select.Option>
                                {Branch.map(row =>
                                    <Select.Option key={row.value} value={row.value}>{row.text}</Select.Option>)}
                            </Select>
                        } {...props}/>

                        <EditableCell edit={edit} name="batch" label="Batch" inputProps={
                            <Select placeholder="Select batch" showSearch>
                                <Select.Option key="batch" value={null}>None</Select.Option>
                                {_.range(new Date().getFullYear() - 3, 1985).map(row =>
                                    <Select.Option key={row} value={row}>{row}</Select.Option>)}
                            </Select>
                        } {...props}/>

                        <EditableCell edit={edit} name="passing" label="Passing Year" inputProps={
                            <Select placeholder="Select passing year" showSearch>
                                <Select.Option key="passing" value={null}>None</Select.Option>
                                {_.range(new Date().getFullYear(), 1985).map(row =>
                                    <Select.Option key={row} value={row}>{row}</Select.Option>)}
                            </Select>
                        } {...props}/>

                        <EditableCell edit={edit} name="organisation" label="Organisation"
                                      placeholder="Enter current organisation" {...props}/>

                        <EditableCell edit={edit} name="designation" label="Designation"
                                      placeholder="Enter current designation" {...props}/>

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

const AlumniDataView = Form.create()(AlumniDataViewForm);


AlumniDataView.propTypes = {
    data: PropTypes.any.isRequired
};

export default AlumniDataView;