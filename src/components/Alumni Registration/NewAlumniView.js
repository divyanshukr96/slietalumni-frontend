import React from 'react';
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
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
    value: PropTypes.any,
};

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
                {data.verified ?
                    <Button type={"dashed"}>Registered</Button>
                    : <Button type={"primary"} onClick={() => {
                        Modal.confirm({
                            title: `Do you Want to confirm the registration of ${data.name}?`,
                            content: '',
                            onOk: onConfirm,
                        });
                    }}>
                        Confirm Registration
                    </Button>}
            </div>
        </Modal>
    );
};


NewAlumniView.propTypes = {
    data: PropTypes.any.isRequired
};

export default NewAlumniView;
