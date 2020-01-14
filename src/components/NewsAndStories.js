import React, {useEffect, useState} from 'react';
import axios from "axios";
import * as _ from "lodash";
import {Link, withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import {Card, Icon, List, Typography} from "antd";

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
    const isCancelled = React.useRef(false);
    const [newsStories, setNewsStories] = useState(JSON.parse(sessionStorage.getItem('news_stories')) || []);
    const [loading, setLoading] = useState(_.isEmpty(newsStories));
    const {card, meta, list, itemCss} = useStyles();

    function fetchUrl() {
        axios.get("api/public/news-stories").then(({data}) => {
            if (!isCancelled.current) {
                if (data.data) {
                    sessionStorage.setItem('news_stories', JSON.stringify(data.data));
                    setNewsStories(data.data);
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
                            extra={item.cover_thumb && <img
                                width={80}
                                alt={item.title}
                                src={item.cover_thumb}/>
                            } // delete css if this is removed
                        >
                            <List.Item.Meta
                                className={meta}
                                title={<a href={item.href}
                                          onClick={() => props.history.push('/news/' + item.id, item)}
                                >{item.title}</a>}
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
