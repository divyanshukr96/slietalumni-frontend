import React, {Component} from 'react';
import {Card, Carousel, Col, Icon, Input, Typography, Row, Tooltip, Button, Avatar, Menu, Badge} from "antd";
import {withStyles} from "@material-ui/core";
import ProfileDetails from "components/Profile/ProfileDetails";
import SidebarChat from "components/Profile/SidebarChat";
import CoverPhoto from "components/Profile/CoverPhoto";
import About from "components/Profile/About";
import FileUploadButton from "components/Alumni Registration/FileUploadButton";
import NewPost from "components/Profile/NewPost";

const {Text} = Typography;

const styles = theme => ({
    cardHead: {
        '& .ant-card-head ': {
            minHeight: 'unset',
            '& > div >div': {
                padding: '8px 0'
            }
        }
    },


});

class ProfileTmp extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Row gutter={8}>
                <Col span={6}>

                    <ProfileDetails/>

                    <Card hoverable
                          title="Intro"
                          style={{marginTop: 16}}
                          className={classes.cardHead}


                          extra={<Icon type="ellipsis" key="ellipsis"/>}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>

                </Col>
                <Col span={13}>

                    <Row type="flex" justify="center">
                        <Col span={18}>

                            <NewPost/>

                        </Col>
                    </Row>


                </Col>
                <Col span={5}>

                    <SidebarChat/>

                </Col>
            </Row>
        );
    }
}

class Profile extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Row gutter={8}>
                <Col span={6}>

                    <Menu
                        onClick={this.handleClick}
                        style={{width: 256}}
                        defaultSelectedKeys={['home']}
                        defaultOpenKeys={['home']}
                        mode="inline"
                    >
                        <Menu.Item key="home">
                            <Icon type="home"/>
                            <span>Home</span>
                        </Menu.Item>

                        <Menu.Item key="explore">
                            <Icon type="number"/>
                            <span>Explore</span>
                        </Menu.Item>

                        <Menu.Item key="Notification">
                            <Icon type="bell"/>
                            <span>Notification</span>
                        </Menu.Item>

                        <Menu.Item key="Message" >
                            <Badge count={2} offset={[15, 0]}>
                                <Icon type="mail"/>
                                <span>Message</span>
                            </Badge>

                        </Menu.Item>

                        <Menu.Item key="Bookmark">
                            <Icon type="book"/>
                            <span>Bookmark</span>
                        </Menu.Item>

                        <Menu.Item key="list">
                            <Icon type="profile"/>
                            <span>List</span>
                        </Menu.Item>

                        <Menu.Item key="profile">
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                size={"small"} style={{marginLeft: -4, marginRight: 4}}
                            />
                            <span>Profile</span>
                        </Menu.Item>

                        <Menu.Item key="more">
                            <Icon type="ellipsis" key="ellipsis"
                                  style={{border: 'solid 1px', borderRadius: '50%', fontWeight: 500}}/>
                            <span>More</span>
                        </Menu.Item>


                        <Menu.SubMenu
                            key="sub4"
                            title={
                                <span>
<Icon type="setting"/>
<span>Navigation Three</span>
</span>
                            }
                        >
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>

                </Col>
                <Col span={13}>

                    <Row type="flex" justify="center">
                        <Col span={18}>

                            <NewPost/>

                        </Col>
                    </Row>


                </Col>
                <Col span={5}>

                    <SidebarChat/>

                </Col>
            </Row>
        );
    }
}

export default withStyles(styles)(Profile);
