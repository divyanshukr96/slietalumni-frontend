import React from 'react';
import * as _ from "lodash";
import * as PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {Avatar, Button, Modal, Result, Typography} from "antd";
import logo from 'assets/SAA-logo-color.png'

const {Paragraph, Title} = Typography;

function RegistrationSubmitted(props) {
    const {visible, data} = props;
    if (_.isEmpty(data)) return <div/>;
    return (
        <Modal visible={visible} footer={null} closable={false}>
            <Result
                icon={<Avatar size={100} src={logo} shape={"square"} style={{width: 150, height: 'auto'}}/>}
                status="success"
                title="Membership Registration Success"
                subTitle={
                    <>
                        <Title level={4}>Hi {data.name}</Title>
                        <Paragraph>
                            Your Membership form of SLIET Alumni Association is successfully submitted.
                        </Paragraph>
                        <Paragraph>
                            Your account is under evaluation, Once your account is verified you will receive and
                            email with your login details
                        </Paragraph>
                    </>
                }
                extra={[
                    <Button type="primary" key="console" onClick={() => props.history.push('/')}>
                        Go Home
                    </Button>
                ]}
            />
        </Modal>
    );
}

RegistrationSubmitted.propTypes = {
    visible: PropTypes.bool.isRequired,
    data: PropTypes.object,
};

export default withRouter(RegistrationSubmitted);
