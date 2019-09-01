import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import {Avatar, Button, Card, Col, Divider, Result, Row, Table, Tooltip, Typography} from "antd";
import Text from "antd/es/typography/Text";
import ambulance from 'assets/ambulance.svg'
import DonationForm from "./DonationForm.js";

const {Title, Paragraph} = Typography;

const styles = theme => ({
    main: {
        width: '100%',
        maxWidth: 1100,
        margin: 'auto',
    },
    details: {
        textAlign: 'justify',
    }
});

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

class Index extends Component {
    render() {
        const {classes} = this.props;
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

                    <Row style={{marginTop: 16}}>
                        <Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>
                            <Card
                                hoverable
                                cover={
                                    <div style={{textAlign: 'center'}}>
                                        <img alt="example" src={ambulance} style={{width: 120}}/>
                                    </div>
                                }
                                bodyStyle={{paddingTop: 4}}
                            >
                                <Card.Meta
                                    title="Donate for Ambulance fund"
                                    description="Donate for Ambulance fund"
                                />
                                <div style={{textAlign: 'center', marginTop: 16}}>
                                    <DonationForm donateFor={'Ambulance'}/>
                                </div>

                            </Card>
                        </Col>
                        <Col xs={{span: 11, offset: 1}} lg={{span: 6, offset: 2}}>

                        </Col>
                        <Col xs={{span: 5, offset: 1}} lg={{span: 6, offset: 2}}>

                        </Col>
                    </Row>

                </div>
            </>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
