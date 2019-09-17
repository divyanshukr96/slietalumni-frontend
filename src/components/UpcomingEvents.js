import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
import {Card, Icon, List, Typography} from "antd";
import axios from "axios";

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
    const {card, meta, list} = useStyles();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);


    async function fetchUrl() {
        const {data} = await axios.get("api/public/events");
        if (data.data) setEvents(data.data);
    }

    useEffect(() => {
        fetchUrl().then(r => setLoading(false));
    }, []);

    console.log(props)
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
                                title={<a href="https://ant.design">{event.title}</a>}
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