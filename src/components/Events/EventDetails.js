import React, {useEffect, useState} from 'react';
import axios from "axios";
import * as _ from "lodash";
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

const EventDetails = (props) => {
    const classes = useStyles();

    const [event, setEvent] = useState({});


    useEffect(() => {
        function fetchUrl() {
            const {history: {action}, match: {params}, location} = props;
            if (action === "PUSH") return setEvent(location.state);
            axios.get("/api/public/events").then(({data}) => {
                if (data.data) setEvent(data.data.filter(ev => ev.id === params.event)[0])
            });
        }

        fetchUrl();
    }, [props]);

    return (
        <div className={classes.main}>
            <Card
                loading={_.isEmpty(event)}
                hoverable={true}
                style={{marginBottom: 8}}
                bodyStyle={{paddingTop: 16, paddingBottom: 16}}
            >
                {!_.isEmpty(event) && <>
                    <Title level={3} style={{marginBottom: 2}}>{event.title}</Title>
                    <IconText type="global" text={event.published_at}/><br/>
                    <Divider style={{margin: `12px 0`}}/>
                    <div style={{textAlign: 'center', marginBottom: `8px`}}>
                        <a href={event.image} target="_blank" rel="noopener noreferrer">
                            <img
                                key={"image"}
                                width={300}
                                alt="logo"
                                src={event.image_thumb}
                                style={{maxWidth: '100%'}}
                            />
                        </a>
                    </div>

                    <Paragraph style={{textAlign: 'justify'}}>
                        <div dangerouslySetInnerHTML={{__html: event.content}}/>
                    </Paragraph>

                    <div style={{fontWeight: 500}}>
                        <Paragraph style={{marginBottom: 2}}>Venue: {event.venue}</Paragraph>
                        <Paragraph>Date: {event.date}</Paragraph>
                    </div>

                    <div style={{textAlign: 'center'}}>
                        <Button onClick={() => props.history.goBack()}>Back</Button>
                    </div>

                </>}

            </Card>

        </div>
    );
};

export default EventDetails;
