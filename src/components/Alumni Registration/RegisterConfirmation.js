import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Paper, withStyles} from "@material-ui/core";
import SAALogo from "components/SAA-logo-color.png";
import {Typography} from "antd";
import {Divider} from "antd/es";
import RegisterConfirmationForm from "components/Alumni Registration/RegisterConfirmationForm";
const {Title} = Typography;

const styles = theme => ({
    main: {
        width: 'auto',
        maxWidth: '100%',
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

class RegisterConfirmation extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
                <Paper className={classes.main}>
                    <div style={{textAlign: 'center'}}>
                        <img src={SAALogo} alt="saa-logo" style={{height: 80}}/>
                        <Title level={4} style={{margin: `8px 0`}}>
                            Registration Confirmation
                        </Title>
                        <Title level={4} style={{margin: `8px 0`, fontSize: 'initial'}}>
                            Set Username & Password
                        </Title>
                        <Divider style={{margin: `4px 0`}}/>
                    </div>
                    <RegisterConfirmationForm/>
                </Paper>
            </>
        );
    }
}

RegisterConfirmation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterConfirmation);