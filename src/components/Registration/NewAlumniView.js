import React, {useState} from 'react';
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {Button, Col, Form, Input, InputNumber, Modal, Row, Typography} from "antd";
import FileUploadButton from "./FileUploadButton";
import FormError from "../Errors";

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

const RegistrationConfirm = Form.create({name: 'alumni_registration_confirm'})(
    ({form, onConfirm}) => {
        const [visible, setVisible] = useState(false);
        const [loading, setLoading] = useState(false);

        const handleConfirm = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    onConfirm(values).then(res => {
                        if (res) setVisible(false);
                        setLoading(false);
                    })
                }
            });
        };

        const {getFieldDecorator} = form;
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
                    <FormError form={form} formName="alumni_registration_confirm"/>
                    <Form.Item style={{marginBottom: 0}}>
                        {getFieldDecorator('_method', {initialValue: 'PATCH'})(<Input hidden/>)}
                    </Form.Item>

                    <Form.Item style={{marginBottom: 8}}>
                        {getFieldDecorator('amount', {
                            rules: [{required: true, message: 'Please enter the amount received!'}],
                        })(<InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            placeholder="Enter amount received!"
                            style={{width: '100%'}}
                        />)}
                    </Form.Item>

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
                </Form>
            </Modal>
        </>
    }
);

const NewAlumniView = ({data, onConfirm, onClose}) => {
    return (
        <Modal
            width={600}
            bodyStyle={{paddingBottom: 8}}
            visible={!_.isEmpty(data)}
            title="New Alumni Data"
            destroyOnClose={true}
            footer={<Button onClick={() => onClose(null)}>Close</Button>}
            onCancel={() => onClose(null)}
        >

            <Row>
                <DataCol label={'Name'} value={data.name}/>
                <DataCol label={'E-mail'} value={data.email}/>
                <DataCol label={'Mobile'} value={data.mobile}/>
                <DataCol label={'Programme'} value={data.programme}/>
                <DataCol label={'Branch'} value={data.branch}/>
                <DataCol label={'Batch'} value={data.batch}/>
                <DataCol label={'Passing Year'} value={data.passing}/>
                <DataCol label={'Organisation'} value={data.organisation}/>
            </Row>

            <div style={{textAlign: 'right'}}>
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
                {data.verified ? <Button type={"dashed"}>Registered</Button> :
                    <RegistrationConfirm data={data} onConfirm={onConfirm}/>}
            </div>
        </Modal>
    );
};


NewAlumniView.propTypes = {
    data: PropTypes.any.isRequired
};

export default NewAlumniView;
