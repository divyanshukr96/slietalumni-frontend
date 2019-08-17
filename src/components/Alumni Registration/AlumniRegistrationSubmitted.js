import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Avatar, Button, Modal, Result} from "antd";
import logo from 'assets/SAA-logo-color.png'

class AlumniRegistrationSubmitted extends Component {
    render() {
        const {visible} = this.props;
        return (
            <Modal visible={visible} footer={null} closable={false}>
                <Result
                    icon={<Avatar size={100} src={logo} shape={"square"} style={{width: 150, height: 'auto'}}/>}
                    status="success"
                    title="Successfully Purchased Cloud Server ECS!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Button type="primary" key="console">
                            Go Console
                        </Button>,
                        <Button key="buy">Buy Again</Button>,
                    ]}
                />,
            </Modal>
        );
    }
}

AlumniRegistrationSubmitted.propTypes = {
    visible: PropTypes.bool.isRequired,
    data: PropTypes.object,
};

export default AlumniRegistrationSubmitted;
