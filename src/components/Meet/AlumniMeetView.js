import React, {useState} from 'react';
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {Button, Checkbox, Col, Divider, Form, Input, InputNumber, Modal, Radio, Row, Typography} from "antd";

import FormError from "../Errors";
import FileUploadButton from "../Registration/FileUploadButton";

const {Text} = Typography;

const DataCol = ({label, value}) => {
    return value ? (
        <>
            <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>{label} : </Col>
            <Col sm={16} xs={14} style={{padding: 8}}><Text strong>{value}</Text></Col>
        </>
    ) : null
};

DataCol.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
};

const RegistrationConfirm = Form.create({name: 'alumni_meet_confirmation'})(
    ({form, onMeetConfirm, data}) => {

        const [visible, setVisible] = useState(false);
        const [loading, setLoading] = useState(false);

        const handleConfirm = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    onMeetConfirm(values).then(res => {
                        if (res) setVisible(false);
                        setLoading(false);
                    })
                }
            });
        };

        const {getFieldDecorator, getFieldValue} = form;

        return <>
            <Button type={"primary"} onClick={() => setVisible(true)}>
                Confirm Registration
            </Button>
            <Modal
                width={330}
                title="Confirm registration"
                bodyStyle={{padding: 16}}
                visible={visible}
                destroyOnClose={true}
                footer={<Button loading={loading} type={"primary"} onClick={handleConfirm}>Submit</Button>}
                onCancel={() => setVisible(false)}
            >
                <Form>
                    <FormError form={form} formName="alumni_meet_confirmation"/>
                    {/*<Form.Item style={{marginBottom: 0}}>*/}
                    {/*    {getFieldDecorator('_method', {initialValue: 'PATCH'})(<Input hidden/>)}*/}
                    {/*</Form.Item>*/}

                    <Form.Item label="Payment Mode" style={{marginBottom: 8}}>
                        {getFieldDecorator('mode', {
                            rules: [{required: true, message: 'Please select the payment mode!'}],
                        })(
                            <Radio.Group>
                                <Radio value="ONLINE">Online</Radio>
                                <Radio value="CASH">Cash</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item style={{marginBottom: 8}}>
                        {getFieldDecorator('amount', {
                            rules: [{required: true, message: 'Please enter the amount received!'}],
                            initialValue: data.fees
                        })(<InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            placeholder="Enter amount received!"
                            style={{width: '100%'}}
                        />)}
                    </Form.Item>


                    {getFieldValue("mode") !== "CASH" && <>
                        <FileUploadButton
                            formProps={form} label={''}
                            name={'receipt'}
                            uploadProps={{
                                listType: 'picture'
                            }}
                            decoratorProps={{rules: [{required: true, message: 'Please select payment receipt!'}]}}
                            itemProps={{
                                style: {marginBottom: 8}
                            }}
                        >
                            <Button icon="file"> Upload payment receipt</Button>
                        </FileUploadButton>
                        <Form.Item style={{marginBottom: 0}}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Confirm your password!'}],
                            })(<Input.Password placeholder="Confirm your password"/>)}
                        </Form.Item>
                    </>}

                </Form>
            </Modal>
        </>
    }
);


const AlumniMeetView = ({data, onConfirm, onClose, onUpdate, form}) => {

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const {getFieldDecorator} = form;

    const updateData = () => {
        form.validateFields((err, values) => {
            if (!err) {
                setLoading(true);
                onUpdate(data.id, values).then(res => {
                    if (res) setEdit(false);
                    setLoading(false);
                })
            }
        });
    };

    return (
        <Modal
            width={600}
            bodyStyle={{padding: `12px 4px`}}
            visible={!_.isEmpty(data)}
            title="New Alumni Data"

            cancelText="Close"
            okText={edit ? "Update" : "Edit"}
            onOk={() => edit ? updateData() : setEdit(true)}
            onCancel={() => {
                setEdit(false);
                onClose(null)
            }}
            confirmLoading={loading}
            maskClosable={false}
            destroyOnClose
        >

            <Row type='flex'>
                <DataCol label={'Name'} value={data.name}/>
                <DataCol label={'E-mail'} value={data.email}/>
                <DataCol label={'Mobile'} value={data.mobile}/>
                <DataCol label={'Programme'} value={`${data.programme} (${data.branch})`}/>
                <DataCol label={'Batch'} value={`${data.batch} - ${data.passing}`}/>
                <DataCol label={'Organisation'} value={data.organisation}/>

                <Divider style={{margin: 0, height: 4, background: '#1da57a'}}/>

                {!edit ?
                    <>
                        <DataCol label={'Family'} value={<Checkbox checked={data.family}/>}/>
                        <DataCol label={'Accommodation'} value={<Checkbox checked={data.accommodation}/>}/>
                    </> :
                    <Col
                        sm={{span: 16, offset: 8}}
                        xs={{span: 19, offset: 5}}
                        style={{paddingLeft: 8}}
                    >
                        <Form>
                            <FormError form={form} formName="alumni_meet_update"/>
                            <Form.Item style={{marginBottom: 0}}>
                                {getFieldDecorator('family', {
                                    valuePropName: 'checked',
                                    initialValue: data.family
                                })(<Checkbox>With Family</Checkbox>)}
                            </Form.Item>
                            <Form.Item style={{marginBottom: 0}}>
                                {getFieldDecorator('accommodation', {
                                    valuePropName: 'checked',
                                    initialValue: data.accommodation
                                })(<Checkbox>Accommodation required</Checkbox>)}
                            </Form.Item>
                        </Form>
                    </Col>
                }


                <DataCol label={'Requirements'} value={data.requirements}/>

                <DataCol label={'Regd. Charge'} value={`₹ ${data.fees}/-`}/>

                {data.meet_id && <Col xs={24} style={{textAlign: 'center', padding: `8px 0`}}>
                    <Button type={"primary"}>Meet ID : {data.meet_id}</Button>
                </Col>}

            </Row>

            <div style={{textAlign: "center"}}>

            </div>

            <div style={{textAlign: 'right', marginRight: 8}}>
                {/*{data.verified ?*/}
                {/*    <Button type={"dashed"}>Registered</Button>*/}
                {/*    : <Button type={"primary"} onClick={() => {*/}
                {/*        Modal.confirm({*/}
                {/*            title: `Do you Want to confirm the registration of ${data.name}?`,*/}
                {/*            content: '',*/}
                {/*            onOk: onConfirm,*/}
                {/*            okText: <span><Icon type="check"/> Confirm</span>,*/}
                {/*        });*/}
                {/*    }}>*/}
                {/*        Confirm Registration*/}
                {/*    </Button>}*/}
                {data.verified ? <Button type={"dashed"} icon="check">Registration Confirmed</Button> :
                    edit ? null : <RegistrationConfirm data={data} onMeetConfirm={onConfirm}/>}
            </div>

        </Modal>
    );
};


AlumniMeetView.propTypes = {
    data: PropTypes.any.isRequired,
};


export default Form.create({name: 'alumni_meet_update'})(AlumniMeetView);
