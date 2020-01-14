import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
import {Card, Icon, List, Typography} from "antd";
import axios from "axios";
import * as _ from "lodash";

const {Paragraph} = Typography;

const useStyles = makeStyles(theme => ({
    card: {
        '& > :first-child > div div': {
            padding: `8px 0`,
        }
    },
    list: {
        '& > :last-child': {
            marginTop: 0,
        },
    },
    meta: {
        marginBottom: `4px !important`,
        '& h4': {
            marginBottom: `4px !important`,
        },
        '& ~ ul': {
            marginTop: `0 !important`,
        }
    }
}));

const UpcomingEvents = (props) => {
    const isCancelled = React.useRef(false);
    const {card, meta, list} = useStyles();

    const [events, setEvents] = useState(JSON.parse(sessionStorage.getItem('upcoming_event')) || []);
    const [loading, setLoading] = useState(_.isEmpty(events));

    function fetchUrl() {
        axios.get("api/public/events").then(({data}) => {
            if (!isCancelled.current) {
                if (data.data) {
                    sessionStorage.setItem('upcoming_event', JSON.stringify(data.data));
                    setEvents(data.data);
                }
                setLoading(false)
            }
        }).catch(() => setLoading(false));
    }

    useEffect(() => {
        fetchUrl();
        return () => {
            isCancelled.current = true;
        };
    }, []);

    return (
        <>
            <Card
                headStyle={{minHeight: 'auto'}}
                bodyStyle={{padding: `0 8px`}}
                className={card}
                title={'Upcoming Events'}
                extra={<Link to={'/events'}>View All</Link>}
            >
                <List
                    itemLayout="vertical"
                    className={list}
                    dataSource={events}
                    loading={loading}
                    // size="large"
                    pagination={{
                        pageSize: 4,
                        size: 'small',
                        hideOnSinglePage: true,
                    }}
                    renderItem={event => (
                        <List.Item
                            key={event.id}
                            style={{padding: `8px 0`}}
                            actions={[
                                <span><Icon type={"calendar"} style={{marginRight: 8}}/>{event.date}</span>,
                                <a href={event.href}
                                   onClick={() => props.history.push('/events/' + event.id, event)}
                                >View Details</a>
                            ]}
                        >
                            <List.Item.Meta
                                className={meta}
                                title={<a href={event.href}
                                          onClick={() => props.history.push('/events/' + event.id, event)}
                                >{event.title}</a>}
                                description={<Paragraph ellipsis={{rows: 3}} style={{marginBottom: 0}}>
                                    {event.description}
                                </Paragraph>}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </>
    );
};


export default withRouter(UpcomingEvents);
