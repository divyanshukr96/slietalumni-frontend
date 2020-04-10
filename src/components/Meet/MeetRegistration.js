import React from 'react';
import {makeStyles} from '@material-ui/core'
import {Paper} from "@material-ui/core";
import SAALogo from "../../assets/SAA-logo-color.png";
import {Divider, Typography} from "antd";
import MeetRegistrationForm from "./MeetRegistrationForm";

const {Title, Text} = Typography;

const useStyles = makeStyles(theme => ({
    main: {
        width: 'auto',
        maxWidth: '100%',
        padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`,
        [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
            width: 800,
            margin: 'auto',
        },
        [theme.breakpoints.down(768)]: {
            boxShadow: theme.shadows[1],
            padding: '8px 8px 24px',
            marginTop: 4,
            '& img':{
                display: 'none',
            }
        },
    },
}));

const MeetRegistration = () => {
    const classes = useStyles();
    return (
        <>
            <Paper className={classes.main}>
                <div style={{textAlign: 'center'}}>
                    <img src={SAALogo} alt="saa-logo" style={{height: 80}}/>
                    <Title level={4} style={{margin: `8px 0`}}>
                        Alumni Meet Registration 2020
                    </Title>
                    <Text style={{fontWeight: 500, fontSize: 16}}>February 15, 2020</Text>
                    <Divider style={{margin: `4px 0`}}/>
                </div>
                <MeetRegistrationForm/>
            </Paper>
        </>
    );
};

export default MeetRegistration;
