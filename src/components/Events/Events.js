import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, Divider, Table, Typography} from "antd";
import {fetchEvents} from "actions/eventAction";
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
        const {loading, events} = this.props;
        return (
            <div>
                <Title level={3}>Events</Title>
                <Divider style={{margin: `8px 0`}}/>
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
    onLoading: () => dispatch({type: 'EVENT_LOADING'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
