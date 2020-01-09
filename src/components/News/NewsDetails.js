import React, {useEffect, useState} from 'react';
import axios from "axios";
import {makeStyles} from "@material-ui/core";
import {Button, Card, Divider, Icon, Typography} from "antd";
import 'braft-editor/dist/output.css'

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

const NewsDetails = (props) => {
    const classes = useStyles();

    const [news, setNews] = useState({});
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const {history: {action}, match: {params}, location} = props;
        if (action === "PUSH") return setNews(location.state);
        const {data} = await axios.get("/api/public/news-stories");
        if (data.data) setNews(data.data.filter(ev => ev.id === params.news)[0])
    }

    useEffect(() => {
        setLoading(true);
        fetchUrl().then(r => setLoading(false));
    }, [props]);

    return (
        <div className={classes.main}>
            <Card
                loading={loading}
                hoverable={true}
                style={{marginBottom: 8}}
                bodyStyle={{paddingTop: 16, paddingBottom: 16}}
            >
                {news && <>
                    <Title level={3} style={{marginBottom: 2}}>{news.title}</Title>
                    <IconText type="global" text={news.published_at}/><br/>
                    <Divider style={{margin: `12px 0`}}/>
                    <div style={{textAlign: 'center', marginBottom: `8px`}}>
                        <img
                            key={"image"}
                            width={300}
                            alt="logo"
                            src={news.cover_thumb}
                            style={{maxWidth: '100%'}}
                        />
                    </div>

                    <Paragraph style={{textAlign: 'justify'}}>
                        <div dangerouslySetInnerHTML={{__html: news.content}}/>
                    </Paragraph>


                    <div style={{textAlign: 'center', marginTop: 16}}>
                        <Button onClick={() => props.history.goBack()}>Back</Button>
                    </div>

                </>}

            </Card>

        </div>
    );
};

export default NewsDetails;
