import React, {Component} from 'react';
import {Paper, withStyles} from "@material-ui/core";
import LoginForm from "./LoginForm";
import {Typography} from "antd";
import SAALogo from './SAA-logo-color.png'
const {Title} = Typography;

const styles = theme => ({
    main: {
        width: 'auto',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            margin: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            boxShadow: theme.shadows[0],
            padding: 0,
        },
    },
});


class Login extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.main}>
                <div style={{textAlign: 'center'}}>
                    <img src={SAALogo} alt="saa-logo" style={{height: 80}}/>
                    <Title level={2}>
                        Sign in
                    </Title>
                </div>
                <LoginForm/>
            </Paper>
        );
    }
}

export default withStyles(styles)(Login);