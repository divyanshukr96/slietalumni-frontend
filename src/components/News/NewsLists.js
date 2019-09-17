import React, {useEffect, useState} from 'react';
import axios from "axios";
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

const NewsLists = (props) => {
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

    const [newses, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const {data} = await axios.get("api/public/news-stories");
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
            <Paper style={{marginBottom: 8, padding: `8px 12px`}}>
                <Title level={3} style={{marginBottom: 0}}>News & Stories</Title>
            </Paper>
            <List
                loading={loading}
                itemLayout="vertical"
                dataSource={newses}
                renderItem={news => (
                    <Card
                        key={news.title}
                        hoverable={true}
                        style={{marginBottom: 8}}
                        bodyStyle={{paddingTop: 8, paddingBottom: 8}}
                    >
                        <List.Item
                            actions={[
                                <IconText type={"calendar"} text={news.published_at}/>,
                                <a href={news.href}
                                   onClick={() => props.history.push('/news/' + news.id, news)}
                                >View Details</a>
                            ]}
                            extra={[
                                <img
                                    key={"image"}
                                    width={120}
                                    alt="logo"
                                    src={news.cover_thumb}
                                />
                            ]}
                            onDoubleClick={() => props.history.push('/news/' + news.id, news)}
                        >
                            <List.Item.Meta
                                style={{marginBottom: 2}}
                                title={[
                                    <a key="link" href={news.href}>{news.title}</a>
                                ]}
                                description={
                                    <Paragraph ellipsis={{rows: 5}}
                                               style={{textAlign: 'justify'}}>{news.description}</Paragraph>
                                }
                            />
                        </List.Item>
                    </Card>
                )}
            />
        </div>
    );
};


export default NewsLists;