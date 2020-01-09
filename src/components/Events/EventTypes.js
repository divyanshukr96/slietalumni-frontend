import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Table} from "antd";
import * as _ from 'lodash'
import {addEventType, deleteEventType, fetchEventTypes, updateEventType} from "actions/eventTypeAction";
import EventTypeAdd from "components/Events/EventTypeAdd";
import EventTypeEdit from "components/Events/EventTypeEdit";

class EventTypes extends Component {
    constructor(props) {
        super(props);
        props.onLoading();
        props.onFetch();
    }

    columns = [
        {title: 'Event Type', dataIndex: 'title'},
        {title: 'Description', dataIndex: 'description'},
        // {title: 'value', dataIndex: 'name'},
        {
            title: 'Action ',
            dataIndex: 'id',
            render: (id) => (
                <Button onClick={() => this.props.onView(id)} size={"small"}>View</Button>
            ),
        },
    ];

    render() {
        const {data, loading, onAddNew, onUpdate, onDelete, onView, eventTypes} = this.props;
        return (
            <div>
                <EventTypeAdd onAdd={onAddNew}/>
                <Table
                    style={{overflow: 'overlay', marginTop: 8}}
                    loading={loading}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={eventTypes}
                />
                <EventTypeEdit
                    data={_.pickBy(data)}
                    onClose={onView}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            </div>
        );
    }
}

const mapStateToProps = ({eventTypes}) => ({
    eventTypes: eventTypes.eventTypes,
    loading: eventTypes.loading,
    data: eventTypes.data
});

const mapDispatchToProps = dispatch => ({
    onFetch: () => dispatch(fetchEventTypes()),
    onAddNew: data => dispatch(addEventType(data)),
    onUpdate: (id, data) => dispatch(updateEventType(id, data)),
    onLoading: () => dispatch({type: 'EVENT_TYPE_LOADING'}),
    onView: id => dispatch({type: 'EVENT_TYPE_EDIT', payload: id}),
    onDelete: () => dispatch(deleteEventType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventTypes);
