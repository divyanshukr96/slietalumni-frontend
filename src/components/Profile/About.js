import React, {Component} from 'react';
import {Button, Card, Col, Divider, Icon, Menu, Row, Tabs} from "antd";
import {Link} from "react-router-dom";
import NewPost from "components/Profile/NewPost";

class About extends Component {
    render() {
        return (
            <Row style={{marginTop: 8}} gutter={16}>
                <Col sm={5}>
                </Col>
                <Col sm={14} style={{marginBottom: 16}} border="true">
                    <Tabs tabBarExtraContent={<NewPost/>} size={"small"}>
                        <Tabs.TabPane tab="Posts" key="1">
                            Content of tab 1
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="History" key="25">
                            Content of tab 255
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Followers" key="21">
                            Content of tab 255
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Follows" key="2">
                            Content of tab 2
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="My Activities" key="3">
                            Content of tab 3
                        </Tabs.TabPane>
                    </Tabs>,
                </Col>
                <Col sm={5}>
                </Col>
                <Col sm={14}>
                    <Card
                        // bodyStyle={{display: 'none'}}
                        size={"small"}
                        actions={[<Icon type="setting"/>,
                            <Button type={"link"}>Profile</Button>,
                            <Icon type="ellipsis"/>,
                            <Icon type="edit"/>]}
                        tabList={[
                            {
                                key: 'about',
                                tab: 'About',
                            },
                            {
                                key: 'app',
                                tab: 'app',
                            },
                            {
                                key: 'project',
                                tab: 'project',
                            },
                        ]}
                    >
                    </Card>
                </Col>
                <Col sm={5}>
                    h
                </Col>
                <Col xs={12}>
                    <Menu
                        mode="horizontal"
                    >

                        <Menu.Item key="/">
                            <Link to={'/'}>
                                Home
                            </Link>
                        </Menu.Item>

                        <Menu.SubMenu title="About">
                            <Menu.Item key="about/alumni-association">
                                <Link to={'/about/alumni-association'}>
                                    Alumni Association
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="about/student-cell">
                                <Link to={'/about/student-cell'}>
                                    Student Cell
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="about/saa-constitution">
                                <Link to={'/about/saa-constitution'}>
                                    SAA Constitution
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>

                        <Menu.SubMenu title="Committee">
                            <Menu.Item key="advisory-committee">
                                <Link to={'/advisory-committee'}>
                                    Advisory
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="executive-committee">
                                <Link to={'/executive-committee'}>
                                    Executive
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>

                        <Menu.Item key="gallery">
                            <Link to={'/gallery'}>
                                Gallery
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="contact">
                            <Link to={'/contact'}>
                                Contact Us
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        );
    }
}

export default About;