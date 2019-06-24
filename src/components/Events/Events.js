import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, Button, Divider, Table, Typography} from "antd";
import * as _ from 'lodash'
import {addEvent, deleteEvent, fetchEvents, updateEvent} from "actions/eventAction";
import {Link} from "react-router-dom";

const {Text, Title} = Typography;

class Events extends Component {
    constructor(props) {
        super(props);
        props.onLoading();
        props.fetchEvents();
    }


    columns = [
        {title: 'Event Title', dataIndex: 'title'},
        {title: 'Event Type', dataIndex: 'event_type'},
        {title: 'Venue', dataIndex: 'venue'},
        {title: 'Date', dataIndex: 'date'},
        {title: 'Time', dataIndex: 'time'},
        {
            title: 'Publish By',
            dataIndex: 'published_by',
            render: (e) => e ? <span><Badge status="success"/>{e}</span> :
                <Text type={"danger"}><Badge status="error"/>Draft</Text>,
        },
        {
            title: 'Publish On',
            dataIndex: 'published_at',
            render: (e) => e ? <span>{e}</span> : <Text>- - - - - -</Text>,
        },
        {
            title: 'Action ',
            dataIndex: 'id',
            render: (id) => (
                <span>
                <Link to={'/sac/events/' + id} onClick={() => this.props.onView(id)} size={"small"}>View</Link>
        </span>
            ),
        },
    ];

    render() {
        const {data, loading, onEventAdd, onEventUpdate, onDelete, onView, roles, events} = this.props;
        return (
            <div>
                <Title level={3}>Events</Title>
                <Divider/>
                {/*<UserDetails*/}
                {/*    data={_.pickBy(data)}*/}
                {/*    onClose={onView}*/}
                {/*    rolesList={roles}*/}
                {/*    onUserUpdate={onEventUpdate}*/}
                {/*    onDelete={onDelete}*/}
                {/*/>*/}
                <Table
                    style={{overflow: 'overlay'}}
                    loading={loading}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={events}
                    size={"small"}
                />
            </div>
        );
    }
}

const mapStateToProps = ({events}) => ({

    events: events.events,
    loading: events.loading,
    data: events.data
});
const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    onEventAdd: data => dispatch(addEvent(data)),
    onEventUpdate: (id, data) => dispatch(updateEvent(id, data)),
    onLoading: () => dispatch({type: 'EVENT_LOADING'}),
    onView: id => dispatch({type: 'EVENT_EDIT', payload: id}),
    onDelete: () => dispatch(deleteEvent()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Events);