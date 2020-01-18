import React, {Component} from 'react';
import * as _ from "lodash";
import {connect} from "react-redux";
import {Badge, Button, Input, PageHeader, Table, Typography} from "antd";
import {enquiryDataSearch, fetchEnquiry} from "actions/enquiryAction";
import EnquiryView from "./EnquiryView";

const {Text} = Typography;

class EnquiriesData extends Component {
    constructor(props) {
        super(props);
        this.props.getDataList();
        this.columns = [
            {title: 'Name', dataIndex: 'name', sorter: (a, b) => this.shorting(a, b, 'name')},
            {title: 'Email', dataIndex: 'email', sorter: (a, b) => this.shorting(a, b, 'email')},
            {title: 'Subject', dataIndex: 'subject',},
            {
                title: "Status",
                dataIndex: 'status',
                render: (status) => status ? <Text type={"danger"}><Badge status="error"/>Closed</Text> :
                    <span><Badge status="success"/>Open</span>,
            },
            {
                title: 'Query Date',
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
        const {data, enquiries, onView, startSearch} = this.props;

        return (
            <PageHeader
                title="Messages / Enquiries"
                style={{padding: 0}}
            >
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: -6}}>
                    <Input.Search
                        style={{maxWidth: 300, marginBottom: 8}}
                        // onKeyUpCapture={this.props.startSearch}
                        onChange={startSearch}
                        onPressEnter={startSearch}
                        placeholder="Search"
                        allowClear
                    />
                    <Button
                        shape="circle" icon="reload"
                        style={{marginLeft: 12}}
                        onClick={this.props.getDataList}
                        size={"small"}
                    />
                </div>

                <EnquiryView
                    data={_.pickBy(data)}
                    onClose={onView}
                />
                <Table
                    style={{overflow: 'overlay'}}
                    size={"middle"}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={enquiries}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                this.props.onView(record.id)
                            },
                            onContextMenu: event => {
                                event.preventDefault();
                            },
                        };
                    }}
                />

            </PageHeader>
        );
    }
}

const mapStateToProps = ({enquiries}) => ({
    enquiries: enquiries.enquiries,
    data: enquiries.data,
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: () => dispatch(fetchEnquiry()),
    startSearch: e => dispatch(enquiryDataSearch(e)),
    onView: key => dispatch({type: 'ENQUIRY_VIEW', payload: key}),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnquiriesData);
