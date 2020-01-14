import React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from "lodash";
import {Button, Col, Modal, Row, Typography} from "antd";

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

const EnquiryView = ({data, onClose}) => {
    return (
        <Modal
            width={600}
            bodyStyle={{padding: `12px 4px`}}
            visible={!_.isEmpty(data)}
            title="Message / Enquiry Details"
            cancelText="Close"
            onCancel={() => onClose(null)}
            footer={<Button onClick={() => onClose(null)}>Close</Button>}
            maskClosable={false}
            destroyOnClose
        >

            <Row type='flex'>
                <DataCol label={'Name'} value={data.name}/>
                <DataCol label={'E-mail'} value={data.email}/>
                <DataCol label={'Subject'} value={data.subject}/>
                <DataCol label={'Message'} value={data.message}/>
            </Row>

            <Row type='flex' style={{background: 'rgba(0, 0, 0, 0.15)'}}>
                <DataCol label={'Verification By'} value={data.verified_by}/>
                <DataCol label={'Verification date'} value={data.verified_at}/>
            </Row>
        </Modal>
    );
};


EnquiryView.propTypes = {
    data: PropTypes.object.isRequired,
};

export default EnquiryView;
