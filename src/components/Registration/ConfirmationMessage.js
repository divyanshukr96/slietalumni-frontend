import React from 'react';
import * as _ from "lodash"
import * as PropTypes from 'prop-types';
import {Avatar, Button, Modal, Result, Tooltip, Typography} from "antd";
import logo from 'assets/SAA-logo-color.png'
import {withRouter} from "react-router-dom";

const {Title} = Typography;

function ConfirmationMessage({data, visible, history}) {
    if (_.isEmpty(data)) return <div/>;
    return (
        <Modal visible={visible} footer={null} closable={false}>
            <Result
                style={{padding: 0}}
                icon={<Avatar size={100} src={logo} shape={"square"} style={{width: 150, height: 'auto'}}/>}
                status="success"
                title={<>
                    Congratulation {data.name}!
                </>}
                subTitle={
                    <>
                        <Title level={4}>Welcome to <Tooltip
                            title={"SLIET Alumni Association"}>SAA</Tooltip> family</Title>
                        Your account of SLIET Alumni Association (SAA) has been successfully created.
                    </>
                }
                extra={[
                    <Button type="primary" key="console" onClick={() => history.replace("/login")}>
                        Login
                    </Button>,
                    <Button key="buy" onClick={() => history.replace("/")}>Home</Button>
                ]}
            />,
        </Modal>
    );
}

ConfirmationMessage.propTypes = {
    visible: PropTypes.bool.isRequired,
    data: PropTypes.object,
};

export default withRouter(ConfirmationMessage);
