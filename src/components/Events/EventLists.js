import React, {useEffect, useState} from 'react';
import axios from "axios";
import {makeStyles} from "@material-ui/core";
import {Card, Icon, List, Typography} from "antd";

const {Paragraph} = Typography;

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
    const classes = useStyles();

    // const [events, dispatch] = useReducer((state, action) => {
    //     switch (action.type) {
    //         case "LIST":
    //             return {
    //                 ...state,
    //                 list: action.payload
    //             };
    //         case 'DETAILS':
    //             return {
    //                 ...state,
    //                 details: state.list.filter(event => event.id === action.payload)[0]
    //             };
    //         default:
    //             return state
    //     }
    // }, {list: [], details: null});

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const {data} = await axios.get("api/public/events");
        if (data.data) setEvents(data.data)
        // if (data.data) dispatch({
        //     type: "LIST",
        //     payload: data.data
        // });
    }

    useEffect(() => {
        fetchUrl().then(r => setLoading(false));
    }, []);

    return (
        <div className={classes.main}>
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
                                description={event.description}
                            />
                        </List.Item>
                    </Card>
                )}
            />
        </div>
    );
};


export default EventLists;