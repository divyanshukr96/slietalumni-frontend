import React, {Component} from 'react';
import * as _ from "lodash";
import {connect} from "react-redux";
import {Button, Input, Table} from "antd";
import NewAlumniData from "components/Alumni Database/NewAlumniData";
import AlumniDataView from "components/Alumni Database/AlumniDataView";
import {Programme, Branch} from 'Constants/ProgrammeAndBranch';
import {
    alumniDataAdd,
    alumniDataDelete,
    alumniDataList,
    alumniDataSearch,
    alumniDataUpdate
} from "actions/alumniDatabaseAction";


class AlumniData extends Component {
    constructor(props) {
        super(props);
        this.props.getDataList();
        this.columns = [
            {title: 'Name', dataIndex: 'name', sorter: (a, b) => this.shorting(a, b, 'name')},
            {title: 'Email', dataIndex: 'email', sorter: (a, b) => this.shorting(a, b, 'email')},
            // {title: 'Mobile', dataIndex: 'mobile'},
            {
                title: 'Programme',
                dataIndex: 'programme',
                filters: [...Programme, {text: 'None', value: 'NONE'}],
                onFilter: (a, b) => this.filter(a, b, 'programme'),
                sorter: (a, b) => this.shorting(a, b, 'programme'),
            },
            {
                title: 'Branch',
                dataIndex: 'branch',
                filters: [...Branch, {text: 'None', value: 'NONE'}],
                onFilter: (a, b) => this.filter(a, b, 'branch'),
                sorter: (a, b) => this.shorting(a, b, 'branch'),
            },
            {
                title: 'Batch',
                dataIndex: 'batch',
                sorter: (a, b) => a.batch - b.batch,
            },
            {
                title: 'Uploaded By',
                dataIndex: 'created_by',
                // sorter: (a, b) => a.batch - b.batch,
            },
            // {
            //     title: 'Passing Year',
            //     dataIndex: 'passing',
            //     sorter: (a, b) => a.passing - b.passing,
            // },
            {
                title: 'Action',
                dataIndex: 'id',
                render: (id, record) => {
                    return (
                        <Button
                            type="link"
                            onClick={() => this.props.onView(record.id)}
                            style={{marginRight: 8, padding: '4px 0'}}
                        >View</Button>
                    );
                },
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
        const {alumni, data, onAlumniAdd, onDelete, onView, onUpdate, startSearch} = this.props;
        return (
            <>
                <Input.Search
                    style={{maxWidth: 300, marginBottom: 8}}
                    // onKeyUpCapture={this.props.startSearch}
                    onChange={startSearch}
                    onPressEnter={startSearch}
                    placeholder="Search"
                    allowClear
                />
                <NewAlumniData onAlumniAdd={onAlumniAdd}/>
                <AlumniDataView
                    data={_.pickBy(alumni)}
                    onClose={onView}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
                <Table
                    style={{overflow: 'overlay'}}
                    size={"middle"}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={data}
                />
            </>
        );
    }
}

const mapStateToProps = ({alumniDatabase}) => ({
    data: alumniDatabase.data,
    alumni: alumniDatabase.alumni,
    editingKey: alumniDatabase.editingKey,
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: () => dispatch(alumniDataList()),
    startSearch: e => dispatch(alumniDataSearch(e)),
    onAlumniAdd: data => dispatch(alumniDataAdd(data)),
    onUpdate: (id, data) => dispatch(alumniDataUpdate(id, data)),
    onDelete: () => dispatch(alumniDataDelete()),
    onView: key => dispatch({type: 'ALUMNI_DATA_VIEW', payload: key}),
    onEdit: key => dispatch({type: 'ALUMNI_DATA_EDIT', payload: key}),
    onEditCancel: () => dispatch({type: 'ALUMNI_DATA_EDIT_CANCEL'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlumniData);
