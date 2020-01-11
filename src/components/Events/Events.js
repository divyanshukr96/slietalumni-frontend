import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, Divider, Select, Table, Typography} from "antd";
import {fetchEvents} from "actions/eventAction";
import {Link} from "react-router-dom";

const {Text, Title} = Typography;

class Events extends Component {
    state = {viewType: "all"};

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

    static getDerivedStateFromProps(props, current_state) {
        const search = new URLSearchParams(props.search).get('type');
        return search ? current_state.viewType !== search ? {
            viewType: search,
        } : null : {
            viewType: "all",
        };
    }

    onSelectChange = (type) => {
        this.props.history.replace(`${this.props.location.pathname}?type=${type}`)
    };

    render() {
        const {loading, events} = this.props;
        let eventList = events;
        switch (this.state.viewType) {
            case "published":
                eventList = events.filter(e => e.published);
                break;
            case "unpublished":
                eventList = events.filter(e => !e.published);
                break;
            default:
                break;
        }
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Title level={3}>Events</Title>
                    <Select
                        style={{width: 130}}
                        value={this.state.viewType}
                        onChange={this.onSelectChange}
                    >
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="published">Published</Select.Option>
                        <Select.Option value="unpublished">Un-Published</Select.Option>
                    </Select>
                </div>
                <Divider style={{margin: `8px 0`}}/>
                <Table
                    style={{overflow: 'overlay'}}
                    loading={loading}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={eventList}
                    size={"middle"}
                />
            </div>
        );
    }
}

const mapStateToProps = ({events, router}) => ({
    events: events.events,
    loading: events.loading,
    data: events.data,
    search: router.location.search,
});

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    onLoading: () => dispatch({type: 'EVENT_LOADING'}),
    onView: id => dispatch({type: 'EVENT_EDIT', payload: id}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
