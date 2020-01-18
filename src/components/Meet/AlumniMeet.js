import React, {Component} from 'react';
import * as _ from "lodash";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, Table, Tooltip, Typography} from "antd";
import {Programme} from 'Constants/ProgrammeAndBranch';
import {
    alumniDataList,
    alumniDataSearch,
    confirmMeetRegistration,
    meetDataUpdate,
} from "actions/alumniMeetAction";
import AlumniMeetView from "./AlumniMeetView";

const {Title} = Typography;

class AlumniMeet extends Component {
    constructor(props) {
        super(props);
        this.props.getDataList();
        this.columns = [
            {
                title: 'Meet ID',
                dataIndex: 'meet_id',
                filters: [{text: 'Verified', value: true}, {text: 'Not-Verified', value: false}],
                onFilter: (value, record) => record["verified"] === value,
            },
            {title: 'Name', dataIndex: 'name', sorter: (a, b) => this.shorting(a, b, 'name')},
            {title: 'Email', dataIndex: 'email', sorter: (a, b) => this.shorting(a, b, 'email')},
            {title: 'Mobile', dataIndex: 'mobile',},
            {
                title: 'Programme',
                dataIndex: 'programme',
                filters: [...Programme, {text: 'None', value: 'NONE'}],
                onFilter: (a, b) => this.filter(a, b, 'programme'),
            },
            {
                title: 'Batch',
                dataIndex: 'batch',
                sorter: (a, b) => a.batch - b.batch,
            },
            {
                title: 'Family',
                dataIndex: 'family',
                render: (id) => <Checkbox checked={id}/>
            },
            {
                title: <Tooltip placement="top" title="Accommodation">Accom.</Tooltip>,
                dataIndex: 'accommodation',
                render: (id) => <Checkbox checked={id}/>
            },
            {
                title: 'Regd. Date',
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
        const {alumni, data, onView, startSearch, onConfirm, onUpdate} = this.props;
        return (
            <>
                <Title level={4}>Alumni Meet Registration</Title>
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


                <AlumniMeetView
                    data={_.pickBy(alumni)}
                    onClose={onView}
                    onConfirm={onConfirm}
                    onUpdate={onUpdate}
                />
                <Table
                    style={{overflow: 'overlay'}}
                    size={"middle"}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={data}
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
            </>
        );
    }
}

const mapStateToProps = ({alumniMeet}) => ({
    data: alumniMeet.data,
    alumni: alumniMeet.alumni,
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: () => dispatch(alumniDataList()),
    startSearch: e => dispatch(alumniDataSearch(e)),
    onUpdate: (id, data) => dispatch(meetDataUpdate(id, data)),
    onConfirm: (data) => dispatch(confirmMeetRegistration(data)),
    onView: key => dispatch({type: 'ALUMNI_MEET_VIEW', payload: key}),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlumniMeet);
