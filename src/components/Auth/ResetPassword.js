import React from 'react';
import {Typography} from "antd";
import {Paper, makeStyles} from "@material-ui/core";
import SAALogo from "assets/SAA-logo-color.png";
import ResetPasswordForm from "./ResetPasswordForm";

const {Title} = Typography;

const useStyles = makeStyles(theme => ({
    main: {
        width: 'auto',
        padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`,
        [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
            width: 400,
            margin: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            boxShadow: theme.shadows[0],
            padding: 8,
        },
    },
    linkedIn: {
        width: '100%',
        background: '#0073b1',
        '& i': {
            float: 'left',
        },
        '& svg': {
            width: '1.5rem',
            height: '1.5rem',
        }

    }
}));

const ResetPassword = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.main}>
            <div style={{textAlign: 'center'}}>
                <img src={SAALogo} alt="saa-logo" style={{height: 80}}/>
                <Title level={4}>
                    Password Reset
                </Title>
            </div>
            <ResetPasswordForm {...props}/>
        </Paper>
    );
};

export default ResetPassword;