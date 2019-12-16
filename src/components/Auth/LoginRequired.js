import React from 'react';
import {Button, Modal, Typography} from "antd";
import SAALogo from "assets/SAA-logo-color.png";
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {authRequired} from "actions/authAction";

const {Title} = Typography;

const LoginRequired = props => {
    const {classes, authRequired, isAuthenticated, ...rest} = props;
    return (
        <Modal
            visible={authRequired && isAuthenticated}
            footer={<Button onClick={props.loginRequired}>Cancel</Button>}
            width={400}
            closable={false}
        >

            <div style={{textAlign: 'center'}}>
                <img src={SAALogo} alt="saa-logo" style={{height: 80}}/>
                <Title level={2}>
                    Sign in
                </Title>
            </div>

            <LoginForm redirect={false} {...rest}/>
        </Modal>
    );
};

const mapStateToProps = ({auth}) => ({
    authRequired: auth.authRequired,
    isAuthenticated: !auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    loginRequired: () => dispatch(authRequired(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRequired);