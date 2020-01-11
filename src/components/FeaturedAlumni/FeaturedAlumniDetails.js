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
    Modal,
    Row,
    Typography
} from "antd";
import FormError from "components/Errors";
import moment from "moment";
import FileUploadButton from "../Registration/FileUploadButton";

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

class FeaturedAlumniDetails extends Component {
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
                this.props.onUpdate(data.id, _.pickBy(values)).then(res => {
                    if (res) this.onEdit();
                    this.setState({loading: false});
                });
            }
        });
    };

    render() {
        const {props: {data, onDelete}, state: {edit}} = this;

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
                confirmLoading={this.state.loading}
                bodyStyle={{paddingBottom: 8}}
            >
                <EditableContext.Provider value={this.props.form}>

                    <Form {...formItemLayout}>
                        <FormError form={this.props.form} formName="featured_alumni_update"/>

                        <EditableCell edit={!data.registered && edit} label={'Name'} name={'name'} data={data}/>
                        <EditableCell edit={!data.registered && edit} label={'Email'} name={'email'} data={data}/>
                        <EditableCell edit={!data.registered && edit} label={'Mobile'} name={'mobile'} data={data}/>
                        <EditableCell
                            edit={!data.registered && edit}
                            label={'Organisation'}
                            name={'organisation'}
                            data={data}
                        />
                        <EditableCell
                            edit={!data.registered && edit}
                            label={'Designation'}
                            name={'designation'}
                            data={data}
                        />

                        <EditableCell
                            edit={edit} label={'Featured Till'} name={'featured'} data={data}
                            initialValue={data.featured && moment(data.featured, "D MMM YYYY")}
                            inputProps={<DatePicker format={"D MMM YYYY"} placeholder="Select date"/>}
                        />

                        {edit ? (
                            <FileUploadButton
                                label={'Alumni Photo'} name={'image'}
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
                                <Button><Icon type="file-image"/> Select Alumni photo</Button>
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
                    {edit || <Button type="danger" icon="delete" size={"small"} onClick={() => onDelete(data.id)}>
                        Delete
                    </Button>}
                </div>
            </Modal>
        );
    }
}

FeaturedAlumniDetails.propTypes = {
    data: PropTypes.any.isRequired
};

export default Form.create({name: 'featured_alumni_update'})(FeaturedAlumniDetails);
