import React, {useEffect, useState} from 'react';
import axios from "axios";
import * as _ from "lodash";
import {makeStyles, Paper} from "@material-ui/core";
import {Card, Icon, List, Typography} from "antd";

const {Paragraph, Title} = Typography;

const useStyles = makeStyles(theme => ({
    main: {
        width: '100%',
        maxWidth: 900,
        margin: 'auto',
        padding: `0 16px`,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        }
    },
}));


const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

const EventLists = (props) => {
    const isCancelled = React.useRef(false);

    const classes = useStyles();

    const eventData = sessionStorage.events;

    const [events, setEvents] = useState(eventData ? JSON.parse(eventData) : []);
    const [loading, setLoading] = useState(_.isEmpty(events));



    useEffect(() => {
        function fetchUrl() {
            axios.get("api/public/events").then(({data}) => {
                if (!isCancelled.current) {
                    if (data.data) {
                        sessionStorage.setItem('events', JSON.stringify(data.data));
                        setEvents(data.data);
                    }
                    setLoading(false)
                }
            }).catch(() => setLoading(false));
        }
        fetchUrl();
        return () => {
            isCancelled.current = true;
        };
    }, []);

    return (
        <div className={classes.main}>
            <Paper style={{marginBottom: 8, padding: `8px 12px`}}>
                <Title level={3} style={{marginBottom: 0}}>Events</Title>
            </Paper>
            <List
                loading={loading}
                itemLayout="vertical"
                dataSource={events}
                renderItem={event => (
                    <Card
                        key={event.title}
                        hoverable={true}
                        style={{marginBottom: 8}}
                        bodyStyle={{paddingTop: 8, paddingBottom: 8}}
                    >
                        <List.Item
                            actions={[
                                <IconText type={"calendar"} text={event.date}/>,
                                <IconText type={"calendar"} text={event.venue}/>,
                                <a href={event.href}
                                   onClick={() => props.history.push('/events/' + event.id, event)}
                                >View Details</a>
                            ]}
                            extra={[
                                <img
                                    key={"image"}
                                    width={120}
                                    alt="logo"
                                    src={event.image_thumb}
                                />
                            ]}
                            onDoubleClick={() => props.history.push('/events/' + event.id, event)}
                        >
                            <List.Item.Meta
                                style={{marginBottom: 2}}
                                title={[
                                    <a key="link" href={event.href}>{event.title}</a>,
                                    <Paragraph key="btn" style={{
                                        fontSize: 'small',
                                        color: 'rgba(0, 0, 0, 0.40)',
                                        marginBottom: 0
                                    }}>{event.published_at}</Paragraph>
                                ]}
                                description={<Paragraph
                                    ellipsis={{rows: 5}}
                                    style={{textAlign: 'justify'}}
                                >
                                    {event.description}
                                </Paragraph>}
                            />
                        </List.Item>
                    </Card>
                )}
            />
        </div>
    );
};


export default EventLists;
