import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {Card, Icon, List, Typography} from "antd";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";

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
    itemCss: { // delete if image is not shown
        '& > :last-child': {
            margin: 'auto',
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


const NewsAndStories = (props) => {
    const [newsStories, setNewsStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const {card, meta, list, itemCss} = useStyles();

    async function fetchUrl() {
        const {data} = await axios.get("api/public/news-stories");
        if (data.data) setNewsStories(data.data);
    }

    useEffect(() => {
        fetchUrl().then(r => setLoading(false));
    }, []);


    return (
        <>
            <Card
                headStyle={{minHeight: 'auto'}}
                bodyStyle={{padding: `0 8px`}}
                className={card}
                title={'News & Stories'}
                extra={<Link to={'/news'}>View All</Link>}
            >
                <List
                    itemLayout="vertical"
                    loading={loading}
                    className={list}
                    dataSource={newsStories}
                    // size="large"
                    pagination={{
                        pageSize: 4,
                        size: 'small',
                        hideOnSinglePage: true,
                    }}
                    renderItem={(item, index) => (
                        <List.Item
                            key={index}
                            style={{padding: `8px 0`}}
                            className={itemCss}
                            actions={[
                                <span>
                                    <Icon type={"calendar"} style={{marginRight: 8}}/>
                                    {item.published_at}
                                    </span>,
                                <a href={item.href}
                                   onClick={() => props.history.push('/news/' + item.id, item)}
                                >View Details</a>
                            ]}
                            extra={<img
                                width={80}
                                alt={item.title}
                                src={item.cover_thumb}/>
                            } // delete css if this is removed
                        >
                            <List.Item.Meta
                                className={meta}
                                title={<a href="#">{item.title}</a>}
                                description={<Paragraph ellipsis={{rows: 3}} style={{marginBottom: 0}}>
                                    {item.description}
                                </Paragraph>}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </>
    );
};


export default withRouter(NewsAndStories);