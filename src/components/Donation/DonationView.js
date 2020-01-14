import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import * as _ from "lodash";
import {Button, Checkbox, Col, Divider, Form, Input, InputNumber, Modal, Row, Typography} from "antd";

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
    value: PropTypes.node,
};

const DonationConfirmation = Form.create({name: 'donation_confirmation'})(
    ({form, onConfirm, data}) => {

        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);

        const handleConfirm = e => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    setLoading(true);
                    onConfirm(data.id, values).then(res => {
                        if (res) setOpen(false);
                        setLoading(false);
                    })
                }
            });
        };

        const {getFieldDecorator} = form;

        return <>
            <Button type={"primary"} onClick={() => setOpen(true)}>
                Confirm Donation
            </Button>
            <Modal
                width={330}
                title="Confirm Donation"
                bodyStyle={{padding: 16}}
                visible={open}
                destroyOnClose={true}
                footer={<Button loading={loading} type={"primary"} onClick={handleConfirm}>Submit</Button>}
                onCancel={() => setOpen(false)}
            >
                <Form>
                    <FormError form={form} formName="donation_confirmation"/>

                    <Form.Item style={{marginBottom: 8}}>
                        {getFieldDecorator('confirm_amount', {
                            rules: [{required: true, message: 'Please enter the amount received!'}],
                            initialValue: data.amount
                        })(<InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            placeholder="Enter amount received!"
                            style={{width: '100%'}}
                        />)}
                    </Form.Item>

                    <Form.Item style={{marginBottom: 8}}>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Confirm your password!'}],
                        })(<Input.Password placeholder="Confirm your password"/>)}
                    </Form.Item>

                    <Form.Item style={{marginBottom: 0}}>
                        {getFieldDecorator('description')(
                            <Input.TextArea autoSize placeholder="Enter description if required !"/>)}
                    </Form.Item>

                </Form>
            </Modal>
        </>
    }
);


const DonationView = ({data, onConfirm, onClose}) => {
    return (
        <Modal
            width={600}
            bodyStyle={{padding: `12px 4px`}}
            visible={!_.isEmpty(data)}
            title="Donation Details"
            cancelText="Close"
            onCancel={() => onClose(null)}
            footer={<Button onClick={() => onClose(null)}>Close</Button>}
            maskClosable={false}
            destroyOnClose
        >

            <Row type='flex'>
                <DataCol label={'Name'} value={data.name}/>
                <DataCol label={'E-mail'} value={data.email}/>
                <DataCol label={'Mobile'} value={data.mobile}/>
                <DataCol label={'Organisation'} value={data.organisation}/>
                <DataCol label={'Designation'} value={data.designation}/>

                <DataCol label={'Member'} value={<Checkbox checked={data.is_member}/>}/>


                <Divider style={{margin: 0, height: 4, background: '#1da57a'}}/>

                <DataCol label={'Donate For'} value={data.category}/>
                <DataCol
                    label={'Amount'}
                    value={data.amount && `₹ ${data.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/-`}
                />

            </Row>

            <Row type="flex" align="middle">
                <Col sm={8} xs={10} style={{padding: 8, textAlign: 'right'}}>Receipt : </Col>
                <Col sm={16} xs={14} style={{padding: 8}}>
                    <img src={data.receipt} style={{maxHeight: 150, maxWidth: '100%'}} alt=""/>
                </Col>
                <DataCol label={'Description'} value={data.description}/>
            </Row>
            <Row type='flex' style={{background: 'rgba(0, 0, 0, 0.15)'}}>
                <DataCol
                    label={'Amount Paid'}
                    value={data.confirm_amount && `₹ ${data.confirm_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/-`}
                />
                <DataCol label={'Verification By'} value={data.verified_by}/>
                <DataCol label={'Verification date'} value={data.verified_at}/>
            </Row>

            <div style={{textAlign: 'right', margin: 8}}>
                {data.verified ? <Button type={"dashed"} icon="check">Donation Confirmed</Button> :
                    <DonationConfirmation data={data} onConfirm={onConfirm}/>}
            </div>

        </Modal>
    );
};


DonationView.propTypes = {
    data: PropTypes.object.isRequired,
};

export default DonationView;
