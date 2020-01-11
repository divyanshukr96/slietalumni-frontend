import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from "@material-ui/core";
import {Avatar, Col, Divider, Row, Typography} from "antd";

const {Title, Paragraph} = Typography;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 1000,
        margin: 'auto',
        textAlign: 'justify',
    },
    name: {
        fontSize: 16,
        marginBottom: `2px !important`,
        marginTop: 4,
    },
    image: {
        boxShadow: theme.shadows[2],
        cursor: 'pointer',
        '&:hover': {
            boxShadow: theme.shadows[4],
        }
    },
}));

const Executive = props => {
    const classes = useStyles();

    const [members, setMembers] = useState(localStorage.executive ? JSON.parse(localStorage.executive) : []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then(res => setLoading(false))
    }, []);

    const fetchData = async () => {
        const {data} = await axios.get('/api/public/members');
        if (data.data) {
            const tmpData = data.data.filter(data => !data.sac);
            setMembers(tmpData);
            localStorage.setItem('executive', JSON.stringify(tmpData));
        }
    };


    return (
        <div className={classes.root}>
            <Row gutter={16}>
                <Col sm={24}>
                    <Title level={3}>
                        Executive Committee
                    </Title>
                    <Divider/>
                </Col>
                {!loading && members.map(data => (
                    <Col lg={6} md={8} sm={12} style={{textAlign: 'center'}} key={data.id}>
                        <Avatar src={data.image} size={180} className={classes.image}/>
                        <Title level={4} className={classes.name}>{data.name}</Title>
                        <Paragraph>{data.designation}</Paragraph>
                    </Col>
                ))}
            </Row>

        </div>
    );
};


export default Executive;
