import React from 'react';
import {withStyles} from "@material-ui/core";
import {Divider, Typography} from "antd/lib/index";

const {Title} = Typography;
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 800,
        margin: 'auto',
        textAlign: 'justify',
    },
    image: {
        maxWidth: '100%',
        paddingBottom: 16,
        [theme.breakpoints.up(400)]: {
            float: 'right', width: 220,
            padding: '0 0 16px 16px',
        }
    }
});

const MessageLayout = ({classes, title, image, children}) => (
    <div className={classes.root}>
        <Title level={4}>{title}</Title>
        <Divider/>
        <img src={image} alt="" className={classes.image}/>
        {children}
    </div>
);

export default withStyles(styles)(MessageLayout);