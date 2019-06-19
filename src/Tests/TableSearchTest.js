import React, {Component} from 'react';
import {Select, Input, Table, Button, Icon} from 'antd';
import * as _ from "lodash"

const Search = Input.Search;
const Option = Select.Option;
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        x: 'extra1'
    }
    , {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        x: 'extra2'
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        x: 'extra2'
    }, {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Perk',
        x: 'extra3'
    }];

class TableSearchTest extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data,
        filtered: false,
        searchText: '',
    };
    handleChange = (pagination, filters, sorter) => {
        // console.log('Various parameters', pagination, filters, sorter);
        // this.setState({
        //     filteredInfo: filters,
        //     sortedInfo: sorter,
        // });
    }
    handleFilter = (value, option) => {
        console.log(value);
        this.setState({
            data: _.flatMap(data, record => {
                const filterMatch = _.includes(record.fieldtext, value);
                if (!filterMatch) {
                    return null;
                }
                return {
                    ...record,
                };
            }).filter(record => !!record),
        });
    }

    // getAdvancedFilters(filterKey) {
    //     let Filters = [];
    //     let title = _.sortBy(this.state.data, filterKey);
    //     title = _.uniqBy(title, filterKey);
    //
    //     _.each(title, e => {
    //         const filter = _.result(e, filterKey);
    //         Filters.push(<Option key={filter}>{filter}</Option>)
    //     })
    //     return Filters
    // }

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
            data: data,
            searchText: '',
            filtered: null
        });
    }
    emitEmpty = () => {
        this.setState({
            data: data,
            searchText: '',
            filtered: null
        });
    }
    onInputChange = (e) => {
        this.setState({searchText: e.target.value});
    }

    onSearch = (e) => {
        const searchText = e.target.value;
        const reg = new RegExp(e.target.value, 'gi');
        this.setState({
            searchText,
            filtered: !!searchText,
            data: _.flatMap(data, record => {
                const nameMatch = record.name.match(reg);
                const addressMatch = record.address.match(reg);
                const ageMatch = record.age.toString().match(reg);
                if (!nameMatch && !addressMatch && !ageMatch) {
                    return null;
                }
                return {
                    ...record,
                };
            }).filter(record => !!record),
        });
        if (e.target.value === '') this.setState({data: data, filtered: null});
    }

    render() {
        let {sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                {text: 'Joe', value: 'Joe'},
                {text: 'Jim', value: 'Jim'},
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name > b.name ? 1 : -1,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {

            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            filters: [
                {text: 'London', value: 'London'},
                {text: 'New York', value: 'New York'},
            ],
            filteredValue: filteredInfo.address || null,
            onFilter: (value, record) => record.fieldtext.address.includes(value),
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,

        }];
        // const docStatus = this.getAdvancedFilters('fieldtext.name');
        // const docAddress = this.getAdvancedFilters('fieldtext.x');

        const {searchText} = this.state;
        const suffix = searchText ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
        return (
            <div>
                <div className="table-operations">
                    <Search size="large" suffix={suffix} onChange={this.onSearch}
                            placeholder="Search Records" value={this.state.searchText}
                            onPressEnter={this.onSearch}
                    />

                    <Button onClick={this.clearAll}>Clear all</Button>
                    {/*<Select notFoundContent={'Not found?!'} onChange={this.handleFilter}*/}
                    {/*        defaultValue={'Document Status'}>*/}
                    {/*    {docStatus}*/}
                    {/*</Select>*/}
                    {/*<Select onChange={this.handleFilter} showSearch placeholder={'Address'}*/}
                    {/*        defaultValue={'Document Address'}>*/}
                    {/*    {docAddress}*/}
                    {/*</Select>*/}
                </div>
                <Table columns={columns} dataSource={this.state.data} rowKey={record => record.key}
                       onChange={this.handleChange} size="small"/>
            </div>
        );
    }
}

export default TableSearchTest;