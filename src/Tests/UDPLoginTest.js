import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {Button} from "antd";


const styles = theme => ({});

class UdpLoginTest extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    send = e => {


    };
    render() {
        const {classes} = this.props;
        return (
            <>
                <Button onClick={this.send}>Submit</Button>
            </>
        );
    }
}


export default withStyles(styles)(UdpLoginTest);