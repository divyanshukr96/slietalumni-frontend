import React, {Component} from 'react';
import * as _ from "lodash";
import {connect} from "react-redux";
import {Button, Form, Input, Popconfirm, Select, Table} from "antd";
import FormError from "components/Errors";
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

const EditableContext = React.createContext();

class EditableCell extends Component {
    getInput = () => {
        const {dataIndex, inputType, inputProps, title} = this.props;
        if (inputType === 'select') {
            return <Select placeholder={`Select ${title}`} style={{width: '100%'}} showSearch>
                <Select.Option key={dataIndex} value={null}>None</Select.Option>
                {inputProps.list.map(row =>
                    <Select.Option key={row.value} value={row.value}>{row.text}</Select.Option>)}
            </Select>;
        }
        return <Input/>;
    };
    renderCell = ({getFieldDecorator}) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            inputProps,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{margin: 0}}>
                        {getFieldDecorator(dataIndex, {
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class AlumniDataTable extends Component {
    constructor(props) {
        super(props);
        this.props.getDataList();
        this.columns = [
            {title: 'Name', dataIndex: 'name', sorter: (a, b) => this.shorting(a, b, 'name'), editable: true},
            {title: 'Email', dataIndex: 'email', sorter: (a, b) => this.shorting(a, b, 'email'), editable: true},
            {title: 'Mobile', dataIndex: 'mobile', editable: true},
            {
                title: 'Programme',
                dataIndex: 'programme',
                filters: [...Programme, {text: 'None', value: 'NONE'}],
                onFilter: (a, b) => this.filter(a, b, 'programme'),
                sorter: (a, b) => this.shorting(a, b, 'programme'),
                editable: true,
                inputType: "select",
                inputProps: {list: Programme}
            },
            {
                title: 'Branch',
                dataIndex: 'branch',
                filters: [...Branch, {text: 'None', value: 'NONE'}],
                onFilter: (a, b) => this.filter(a, b, 'branch'),
                sorter: (a, b) => this.shorting(a, b, 'branch'),
                editable: true,
                inputType: "select",
                inputProps: {list: Branch}
            },
            {
                title: 'Batch',
                dataIndex: 'batch',
                sorter: (a, b) => a.batch - b.batch,
                editable: true,
                inputType: "select",
                inputProps: {list: _.range(new Date().getFullYear() - 3, 1980).map(d => ({value: d, text: d}))}
            },
            {
                title: 'Passing Year',
                dataIndex: 'passing',
                sorter: (a, b) => a.passing - b.passing,
                editable: true,
                inputType: "select",
                inputProps: {list: _.range(new Date().getFullYear(), 1980).map(d => ({value: d, text: d}))}
            },
            {
                title: 'Action',
                dataIndex: 'id',
                render: (id, record) => {
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <Button
                                        type="link"
                                        onClick={() => this.saveChanges(form, record.id)}
                                        style={{paddingLeft: 0}}
                                    >
                                        Save
                                    </Button>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => props.onEditCancel()}>
                                <Button type="link" icon="close-circle"/>
                            </Popconfirm>
                        </span>
                    ) : (
                        <span>
                            <a href={"javascript:;"} style={{marginRight: 8, padding: '4px 0'}}
                               onClick={() => this.props.onView(record.id)}
                            >View</a>
                            <Button type="link" disabled={props.editingKey !== ''}
                                    onClick={() => {
                                        props.form.resetFields();
                                        props.onEdit(record.id)
                                    }}
                                    icon="edit"
                            />
                        </span>
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

    isEditing = record => record.id === this.props.editingKey;

    saveChanges = (form, key) => {
        form.validateFields((error, values) => {
            if (!error) this.props.onUpdate(key, values);
        });
    };

    render() {
        const {alumni, data, form, onAlumniAdd, onDelete, onView, onUpdate, startSearch} = this.props;
        const components = {body: {cell: EditableCell}};
        const columns = this.columns.map(col => {
            if (!col.editable) return col;
            return {
                ...col,
                onCell: record => ({
                    record: _.pickBy(record),
                    inputType: col.inputType ? col.inputType : 'text',
                    inputProps: col.inputProps,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
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
                <AlumniDataView data={_.pickBy(alumni)} onClose={onView} onUpdate={onUpdate} onDelete={onDelete}/>
                <EditableContext.Provider value={form}>
                    <FormError form={form}/>
                    <Table
                        style={{overflow: 'overlay'}}
                        size={"middle"}
                        components={components}
                        rowKey="id"
                        columns={columns}
                        dataSource={data}
                    />
                </EditableContext.Provider>
            </>
        );
    }
}

const AlumniData = Form.create()(AlumniDataTable);

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