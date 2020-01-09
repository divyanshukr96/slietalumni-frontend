import React from 'react';
import {makeStyles} from "@material-ui/core";
import {Card, Col, Divider, Row, Table, Tooltip, Typography} from "antd";
import Text from "antd/es/typography/Text";
import ambulance from 'assets/ambulance.svg'
import healthCare from "assets/healthcare-icon.jpg"
import saaInfra from "assets/SAA-logo-color.png"
import DonationForm from "./DonationForm.js";

const {Title} = Typography;

const useStyles = makeStyles(() => ({
    main: {
        width: '100%',
        maxWidth: 1100,
        margin: 'auto',
    },
    details: {
        textAlign: 'justify',
    }
}));

const columns = [
    {
        dataIndex: 'label',
        key: 'label',
        render: text => <span>{text} <span style={{float: 'right'}}>:</span></span>,
    },
    {
        dataIndex: 'value',
        key: 'value',
    },
];

const data = [
    {
        label: 'Account No.',
        value: <Text copyable>3652214249</Text>
    },
    {
        label: 'Name',
        value: 'SLIET ALUMNI ASSOCIATION'
    },
    {
        label: 'IFSC Code',
        value: <Text copyable>CBIN0283105</Text>
    },
    {
        label: 'Branch',
        value: 'LONGOWAL'
    },
    {
        label: 'Bank Name',
        value: 'Central Bank of India'
    },
];

const Index = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.main}>
                <Title level={3}>Donation to <Tooltip placement="top" title={"SLIET Alumni Association"}>
                    SAA</Tooltip></Title>
                <Divider style={{marginTop: 0}}/>

                <Card
                    title={"Account Details"}
                    bodyStyle={{padding: 0}}
                    style={{borderBottom: 'none', maxWidth: 600, margin: 'auto', whiteSpace: 'nowrap'}}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        showHeader={false}
                        size={"middle"}
                        rowKey={({label}) => label}
                        pagination={false}
                    />
                </Card>

                <Row style={{marginTop: 16}} type={"flex"} justify={"center"} gutter={4}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <div style={{textAlign: 'center', padding: 4}}>
                                    <img alt="example" src={ambulance} style={{height: 70}}/>
                                </div>
                            }
                            bodyStyle={{paddingTop: 4}}
                        >
                            <Card.Meta
                                style={{textAlign: 'center'}}
                                title="Donate for Ambulance fund"
                            />
                            <div style={{textAlign: 'center', marginTop: 16}}>
                                <DonationForm donateFor={'Ambulance'}/>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <div style={{textAlign: 'center', padding: 7}}>
                                    <img alt="example" src={healthCare} style={{height: 64}}/>
                                </div>
                            }
                            bodyStyle={{paddingTop: 4}}
                        >
                            <Card.Meta
                                style={{textAlign: 'center'}}
                                title="Donate for Health Care"
                            />
                            <div style={{textAlign: 'center', marginTop: 16}}>
                                <DonationForm donateFor={'Health'}/>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <div style={{textAlign: 'center', padding: 4}}>
                                    <img alt="example" src={saaInfra} style={{height: 70}}/>
                                </div>
                            }
                            bodyStyle={{paddingTop: 4}}
                        >
                            <Card.Meta
                                style={{textAlign: 'center'}}
                                title="Donate for SAA Infrastructure"
                            />
                            <div style={{textAlign: 'center', marginTop: 16}}>
                                <DonationForm donateFor={'Infrastructure'}/>
                            </div>
                        </Card>
                    </Col>
                </Row>

            </div>
        </>
    );
};

export default Index;
