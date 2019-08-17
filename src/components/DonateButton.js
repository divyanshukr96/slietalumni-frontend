import React from 'react';
import {Button} from "antd";
import {withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";

const styles = ({
    root: {
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateX(27%) translateY(-100%)',
        zIndex: 200,
    },
    donate: {
        background: 'red',
        color: 'white',
        transform: 'rotate(-90deg)',
        '&:focus': {
            background: 'red',
            color: 'white',
            transform: 'rotate(-90deg)',
        }
    }
});

const DonateButton = (props) => <div className={props.classes.root}>
    <Button
        hidden={props.location.pathname === '/donate'}
        onClick={() => props.history.push('/donate')}
        className={props.classes.donate}
        type={"danger"}
        size={"large"}
    >
        Donate
    </Button>
</div>;

export default withRouter(withStyles(styles)(DonateButton));