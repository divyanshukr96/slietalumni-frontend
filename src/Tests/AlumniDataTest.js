import React, {Component} from 'react';
import {Button, Form, Input, InputNumber, Popconfirm, Table} from "antd";
import {connect} from "react-redux";
import {alumniDataList, alumniDataSearch} from "actions/alumniDatabaseAction";

const Search = Input.Search;

const EditableContext = React.createContext();

class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };
    renderCell = ({getFieldDecorator}) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
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
        this.data = null;
        this.state = {
            data: [],
            filter: {
                programme: []
            },
            searchText: '',
            editingKey: '',
        };
        this.columns = [
            {title: 'Name', dataIndex: 'name', sorter: (a, b) => this.shorting(a, b, 'name'), editable: true},
            {title: 'Email', dataIndex: 'email', sorter: (a, b) => this.shorting(a, b, 'email'), editable: true},
            {title: 'Mobile', dataIndex: 'mobile', editable: true},
            {
                title: 'Programme',
                dataIndex: 'programme',
                filters: [{text: 'ICD', value: 'ICD'}, {text: 'Certificate', value: 'Certificate'}, {
                    text: 'Diploma',
                    value: 'Diploma'
                }, {text: 'BE', value: 'BE'}, {text: 'None', value: 'NONE'}],
                onFilter: (a, b) => this.filter(a, b, 'programme'),
                sorter: (a, b) => this.shorting(a, b, 'programme'),
                editable: true
            },
            {
                title: 'Branch',
                dataIndex: 'branch',
                sorter: (a, b) => this.shorting(a, b, 'branch'),
                editable: true
            },
            {title: 'Batch', dataIndex: 'batch', sorter: (a, b) => a.batch - b.batch, editable: true},
            {
                title: 'Passing Year',
                dataIndex: 'passing',
                sorter: (a, b) => a.passing - b.passing,
                editable: true
            },
            // {title: 'Action', dataIndex: 'id', key: 'operation', render: (i) => <a href={`/sac/${i}`}>View</a>},

            {
                title: 'Action',
                dataIndex: 'id',
                render: (id, record) => {
                    const {editingKey} = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <Button
                                        type="link"
                                        onClick={() => this.save(form, record.id)}
                                        style={{paddingLeft: 0}}
                                    >
                                        Save
                                    </Button>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                                <Button type="link" icon="close-circle"/>
                            </Popconfirm>
                        </span>
                    ) : (
                        <span>
                            <a href={`/sac/${id}`}>View</a>
                            <Button type="link" disabled={editingKey !== ''}
                                    onClick={() => this.edit(record.id)}
                            >
                                Edit
                            </Button>
                        </span>
                    );
                },
            },
        ];
    }


    componentDidMount() {
        // axios.get('http://127.0.0.1:8000/api/alumni-data').then(({data}) => {
        //     this.setState({
        //         data, filter: {
        //             programme: [...new Set(data.map(item => item.programme))],
        //         }
        //     });
        //     this.data = data;
        // });
        this.props.getDataList();
    }

    shorting = (a, b, name) => {
        if (!a[name]) return 1;
        return a[name].localeCompare(b[name])
    };

    filter = (value, record, column) => {
        if (!record[column]) return value === 'NONE' ? true : null;
        return record[column].indexOf(value) === 0
    };

    // emitEmpty = () => {
    //     this.setState({
    //         data: this.data,
    //         searchText: '',
    //         filtered: null
    //     });
    // };

    // startSearch = e => {
    //     const searchText = e.target.value;
    //     console.log(searchText);
    //     const reg = new RegExp(e.target.value, 'gi');
    //     this.setState({
    //         searchText,
    //         filtered: !!searchText,
    //         data: _.flatMap(this.data, record => {
    //             const nameMatch = record.name.match(reg);
    //             const e = record.email ? record.email.match(reg) : null;
    //             const m = record.mobile ? record.mobile.match(reg) : null;
    //             const pr = record.programme ? record.programme.match(reg) : null;
    //             const b = record.branch ? record.branch.match(reg) : null;
    //             const ba = record.batch ? record.batch.toString().match(reg) : null;
    //             const p = record.passing ? record.passing.toString().match(reg) : null;
    //             if (!nameMatch && !e && !m && !pr && !b && !ba && !p) {
    //                 return null;
    //             }
    //             return {
    //                 ...record,
    //             };
    //         }).filter(record => !!record),
    //     });
    //     if (e.target.value === '') this.setState({data: this.data, filtered: null});
    // };


    isEditing = record => record.id === this.state.editingKey;
    cancel = () => this.setState({editingKey: ''});

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({data: newData, editingKey: ''});
            } else {
                newData.push(row);
                this.setState({data: newData, editingKey: ''});
            }
        });
    }

    edit(key) {
        this.setState({editingKey: key});
    }

    render() {
        // const {searchText} = this.state;
        const components = {body: {cell: EditableCell}};

        const columns = this.columns.map(col => {
            if (!col.editable) return col;
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });


        return (
            <>
                <Search
                    style={{maxWidth: 300, marginBottom: 8}}
                    onKeyUpCapture={this.props.startSearch}
                    onPressEnter={this.props.startSearch}
                    placeholder="Search"
                    // suffix={searchText ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null}
                />
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        rowKey="id"
                        columns={columns}
                        dataSource={this.props.data}
                    />
                </EditableContext.Provider>

            </>
        );
    }
}

const AlumniDataTest = Form.create()(AlumniDataTable);

const mapStateToProps = ({alumniDatabase}) => ({
    data: alumniDatabase.data,
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: () => dispatch(alumniDataList()),
    startSearch: (e) => dispatch(alumniDataSearch(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlumniDataTest);