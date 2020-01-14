import React, {Component} from 'react';
import * as _ from "lodash";
import {connect} from "react-redux";
import {Badge, Button, Checkbox, Col, Input, Row, Table, Typography} from "antd";
import {Category} from 'Constants/Donation';
import {confirmDonation, donationDataSearch, fetchDonation} from "actions/donationAction";
import DonationView from "./DonationView";

const {Title, Text} = Typography;

class DonationData extends Component {
    constructor(props) {
        super(props);
        this.props.getDataList();
        this.columns = [
            {title: 'Name', dataIndex: 'name', sorter: (a, b) => this.shorting(a, b, 'name')},
            {title: 'Email', dataIndex: 'email', sorter: (a, b) => this.shorting(a, b, 'email')},
            {title: 'Mobile', dataIndex: 'mobile',},
            {
                title: 'Donate For',
                dataIndex: 'category',
                filters: [...Category, {text: 'None', value: 'NONE'}],
                onFilter: (a, b) => this.filter(a, b, 'category'),
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                sorter: (a, b) => a.amount - b.amount,
                render: (value) => `₹ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/-`
            },
            {
                title: 'Member',
                dataIndex: 'is_member',
                render: (status) => <Checkbox checked={status}/>
            },
            {
                title: "Status",
                dataIndex: 'verified',
                render: (status) => status ? <span><Badge status="success"/>Success</span> :
                    <Text type={"danger"}><Badge status="error"/>Pending</Text>,
            },
            {
                title: 'Donation Date',
                dataIndex: 'created_at',
                sorter: (a, b) => this.shorting(a, b, 'created_at'),
            },
            {
                title: 'Action',
                dataIndex: 'id',
                render: (id, record) => (
                    <Button
                        type="link" size={"small"}
                        onClick={() => this.props.onView(record.id)}
                    >View</Button>
                )
            },
        ];
    }

    shorting = (a, b, name) => {
        if (!a[name]) return 1;
        return a[name].localeCompare(b[name])
    };

    filter = (value, record, column) => {
        if (!record[column]) return value === 'NONE' ? true : null;
        return record[column].indexOf(value) === 0
    };


    render() {
        const {data, donations, onView, startSearch, onConfirm, onUpdate} = this.props;

        return (
            <>
                <Title level={4}>Donation Data</Title>
                {/*<Title style={{display: 'inline'}} level={4} editable>2020 <Button type={"link"} icon="edit"/></Title>*/}

                <Row>
                    <Col xs={24} sm={16}>
                        <Input.Search
                            style={{maxWidth: 300, marginBottom: 8}}
                            // onKeyUpCapture={this.props.startSearch}
                            onChange={startSearch}
                            onPressEnter={startSearch}
                            placeholder="Search"
                            allowClear
                        />
                    </Col>
                    <Col xs={24} sm={8}>
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 8}}>
                            {/*<Select defaultValue="lucy" style={{width: 120}} onChange={() => true}>*/}
                            {/*    <Select.Option value="jack">Jack</Select.Option>*/}
                            {/*</Select>*/}

                            <Button
                                shape="circle" icon="reload"
                                style={{marginLeft: 12}}
                                onClick={this.props.getDataList}
                                size={"small"}
                            />
                        </div>
                    </Col>
                </Row>


                <DonationView
                    data={_.pickBy(data)}
                    onClose={onView}
                    onConfirm={onConfirm}
                    onUpdate={onUpdate}
                />
                <Table
                    style={{overflow: 'overlay'}}
                    size={"middle"}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={donations}
                />
            </>
        );
    }
}

const mapStateToProps = ({donation}) => ({
    donations: donation.donations,
    data: donation.data,
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: () => dispatch(fetchDonation()),
    startSearch: e => dispatch(donationDataSearch(e)),
    onConfirm: (id, data) => dispatch(confirmDonation(id, data)),
    onView: key => dispatch({type: 'DONATE_VIEW', payload: key}),
});

export default connect(mapStateToProps, mapDispatchToProps)(DonationData);
