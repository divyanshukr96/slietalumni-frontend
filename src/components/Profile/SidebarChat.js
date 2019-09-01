import React, {Component} from 'react';
import {Card, Col, Divider, Icon, Input, Row} from "antd";
import {withStyles} from "@material-ui/core";


const styles = theme => ({
    search: {
        '& input': {
            borderRadius: 0,
            borderLeft: 'unset',
            borderRight: 'unset',
        }
    }
});

class SidebarChat extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>

                <Icon type="ellipsis" key="ellipsis" style={{fontSize: 24, float: 'right', padding: '8px'}}/>

                <Input.Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    className={classes.search}
                />

                <Divider/>

                <Divider/>
            </div>
        );
    }
}

export default withStyles(styles)(SidebarChat);
