import React, {Component} from 'react';
import {Paper, withStyles} from "@material-ui/core";
import LoginForm from "./LoginForm";
import {Button, Divider, Typography} from "antd";
import SAALogo from 'assets/SAA-logo-color.png'

const {Title} = Typography;

const styles = theme => ({
    main: {
        width: 'auto',
        padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`,
        [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
            width: 400,
            margin: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            boxShadow: theme.shadows[0],
            padding: 0,
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
});


class Login extends Component {
    render() {
        const {classes, ...rest} = this.props;
        return (
            <Paper className={classes.main}>
                <div style={{textAlign: 'center'}}>
                    <img src={SAALogo} alt="saa-logo" style={{height: 80}}/>
                    <Title level={2}>
                        Sign in
                    </Title>
                </div>
                <Button icon="linkedin" type="primary" size={"large"} className={classes.linkedIn}>
                    Sign in with LinkedIn
                </Button>
                <Divider orientation={"center"} style={{margin: '8px 0'}}>Or</Divider>
                <LoginForm {...rest}/>
            </Paper>
        );
    }
}

export default withStyles(styles)(Login);
