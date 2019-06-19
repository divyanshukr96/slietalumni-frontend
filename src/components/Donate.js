import React from 'react';
import {Button} from "antd";
import {withStyles} from "@material-ui/core";

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

const Donate = (props) => <div className={props.classes.root}>
    <Button type={"danger"} size={"large"} className={props.classes.donate}>Donate</Button>
</div>;

export default withStyles(styles)(Donate);