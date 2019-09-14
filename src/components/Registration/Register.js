import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Paper, withStyles} from "@material-ui/core";
import AlumniRegistrationForm from "components/Registration/RegistrationForm";
import SAALogo from "assets/SAA-logo-color.png";
import {Typography} from "antd";
import {Divider} from "antd/es";
const {Title} = Typography;

const styles = theme => ({
    main: {
        width: 'auto',
        maxWidth: '100%',
        padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`,
        [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
            width: 800,
            margin: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            boxShadow: theme.shadows[0],
            padding: 8,
        },
    },
});

class Register extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
                <Paper className={classes.main}>
                    <div style={{textAlign: 'center'}}>
                        <img src={SAALogo} alt="saa-logo" style={{height: 80}}/>
                        <Title level={4} style={{margin: `8px 0`}}>
                            New Alumni Registration
                        </Title>
                        <Divider style={{margin: `4px 0`}}/>
                    </div>
                    <AlumniRegistrationForm/>
                </Paper>
            </>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
