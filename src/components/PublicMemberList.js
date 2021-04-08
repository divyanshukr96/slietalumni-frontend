import React from 'react';
import * as _ from "lodash";
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

const PublicMemberList = ({title, members = []}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Title level={4}>
                {title}
            </Title>
            <Divider style={{margin: 0, marginBottom: 16}}/>
            <Row gutter={16} type="flex" justify="center">
                {!_.isEmpty(members) && members.map(data => (
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


export default PublicMemberList;
