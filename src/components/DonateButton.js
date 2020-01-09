import React from 'react';
import {Button} from "antd";
import {makeStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateX(27%)',
        // transform: 'translateX(27%) translateY(-100%)',
        zIndex: 200,
    },
    donate: {
        background: 'red',
        color: 'white',
        transform: 'rotate(-90deg)',
        [theme.breakpoints.down(500)]: {
            height: 24,
            padding: `0 7px`,
        },
        [theme.breakpoints.down(1000)]: {
            height: 32,
            padding: `0 15px`,
        },
        '&:focus': {
            background: 'red',
            color: 'white',
            transform: 'rotate(-90deg)',
        }
    }
}));

const DonateButton = (props) => {
    const classes = useStyles();

    const hiddenPath = [
        '/donate',
        '/login'
    ];

    return (
        <div className={classes.root}>
            <Button
                hidden={hiddenPath.indexOf(props.location.pathname) > -1}
                onClick={() => props.history.push('/donate')}
                className={classes.donate}
                type={"danger"}
                size={"large"}
            >
                Donate
            </Button>
        </div>
    );
};

export default withRouter(DonateButton);
