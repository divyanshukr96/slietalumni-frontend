import React, {Component} from 'react';
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Icon,
    Input,
    Modal, Radio,
    Row, Select,
    Typography
} from "antd";
import FormError from "components/Errors";
import moment from "moment";
import FileUploadButton from "../Registration/FileUploadButton";
import {executiveMemberType, sacMemberType} from "./MemberTypes";

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
        const {data, edit, label, name, options, initialValue} = this.props;
        return edit ? (
            <Form.Item label={label} style={{margin: 0}}>
                {getFieldDecorator(name, {
                    ...options,
                    initialValue: initialValue || data[name],
                })(this.getInput())}
            </Form.Item>
        ) : data[name] ? (
            <Row>
                <Col sm={7} xs={10} style={{padding: 8, textAlign: 'right'}}>{label} : </Col>
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
    inputProps: PropTypes.any,
    initialValue: PropTypes.any,
};

class MemberDetails extends Component {
    state = {
        edit: false,
    };

    onEdit = () => this.setState(s => ({edit: !s.edit}));

    onSave = () => {
        const {form, data} = this.props;
        form.validateFields((err, values) => {
            if (!err) this.props.onUserUpdate(data.id, values).then(res => {
                if (res) {
                    this.onEdit();
                    this.props.onClose(null);
                }
            });
        });
    };

    render() {
        const {props, state: {edit}} = this;
        const {data, form: {getFieldDecorator, isFieldsTouched, getFieldValue}} = props;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 7},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };


        const memberType = getFieldValue('sac') ? sacMemberType : executiveMemberType;


        return (
            <Modal
                visible={!_.isEmpty(data)}
                title="Member Details"
                okText={edit ? 'Update' : 'Edit'}
                cancelText={edit ? 'Cancel' : 'Close'}
                onOk={edit ? this.onSave : this.onEdit}
                onCancel={edit ? this.onEdit : () => this.props.onClose(null)}
                destroyOnClose={true}
                maskClosable={false}
                bodyStyle={{paddingBottom: 8}}
            >
                <EditableContext.Provider value={this.props.form}>

                    <Form {...formItemLayout}>
                        <FormError form={this.props.form} formName="sac_member_update"/>

                        <Form.Item label={'Member Type'} style={{marginBottom: 8}}>
                            {getFieldDecorator('sac', {
                                initialValue: data.sac,
                            })(<Radio.Group disabled={!edit}>
                                <Radio value={true}><span style={{color: !edit && 'black'}}>SAC</span></Radio>
                                <Radio value={false}>
                                    <span style={{color: !edit && 'black'}}>SAA Executive</span>
                                </Radio>
                            </Radio.Group>)}
                        </Form.Item>

                        <EditableCell edit={edit} label={'Name'} name={'name'} data={data}/>

                        <EditableCell
                            edit={edit} label={'Designation'} name={'designation'} data={data}
                            inputProps={<Select placeholder="Select member designation">
                                {memberType.map(d => <Select.Option key={d} value={d}>{d}</Select.Option>)}
                            </Select>}
                        />

                        <EditableCell
                            edit={edit} label={'Member From'} name={'from'} data={data}
                            initialValue={data.from && moment(data.from)}
                            inputProps={<DatePicker format={"D MMM YYYY"} placeholder="Select date"/>}
                        />

                        <EditableCell
                            edit={edit} label={'Member Till'} name={'to'} data={data}
                            initialValue={data.to && moment(data.to)}
                            inputProps={<DatePicker format={"D MMM YYYY"} placeholder="Select date"/>}
                        />

                        <EditableCell
                            edit={edit} label={'Member Profile'} name={'profile'} data={data}
                            placeholder="Enter member profile username"
                        />

                        {/*<Form.Item {...formTailLayout} style={{marginBottom: 8}}>*/}
                        {/*    {getFieldDecorator('sac', {*/}
                        {/*        valuePropName: 'checked', initialValue: data.sac,*/}
                        {/*    })(<Checkbox disabled={!edit}><span style={{color: !edit && 'black'}}>Student Alumni Cell Member</span></Checkbox>)}*/}
                        {/*</Form.Item>*/}

                        {edit ? (
                            <FileUploadButton
                                label={'Member Photo'} name={'image'}
                                formProps={this.props.form}
                                uploadProps={{
                                    accept: 'image/*',
                                    listType: 'picture',
                                    defaultFileList: data.image && [{
                                        uid: _.random(),
                                        url: data.image,
                                        thumbUrl: data.image,
                                        name: _.split(data.image, '/').pop(),
                                    }]
                                }}
                                style={{marginBottom: 8}}
                            >
                                <Button><Icon type="file-image"/> Select member photo</Button>
                            </FileUploadButton>
                        ) : (
                            <Row type="flex" align="middle">
                                <Col sm={7} xs={10} style={{padding: 8, textAlign: 'right'}}>Member Photo : </Col>
                                <Col sm={16} xs={14} style={{padding: 8}}>
                                    <img src={data.image} style={{maxHeight: 150, maxWidth: '100%'}} alt=""/>
                                </Col>
                            </Row>
                        )}

                    </Form>

                </EditableContext.Provider>
                <div style={{textAlign: 'right'}}>
                    {edit || <Button type="danger" icon="delete" size={"small"} onClick={() => props.onDelete(data.id)}>
                        Delete
                    </Button>}
                </div>
            </Modal>
        );
    }
}

MemberDetails.propTypes = {
    data: PropTypes.any.isRequired
};

export default Form.create({name: 'sac_member_update'})(MemberDetails);
