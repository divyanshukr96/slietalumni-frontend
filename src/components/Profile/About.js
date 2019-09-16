import React, {Component} from 'react';
import * as _ from 'lodash'
import {Button, Card, Col, Descriptions, Divider, Icon, Menu, Row, Tabs, Typography} from "antd";
import {Link} from "react-router-dom";
import NewPost from "components/Profile/NewPost";

const {Text, Title} = Typography;

const data = {
    name: 'Divyanshu'
}

class About extends Component {
    render() {
        const {profile} = this.props;
        return (
            <Row style={{marginTop: 8}} gutter={16}>
                <Col sm={4}>
                </Col>
                {/*<Col sm={14} style={{marginBottom: 16}} border="true">*/}
                {/*<Tabs size={"small"}>*/}
                {/*<Tabs.TabPane tab="Posts" key="1">*/}
                {/*    Content of tab 1*/}
                {/*</Tabs.TabPane>*/}
                {/*<Tabs.TabPane tab="News & Stories" key="1">*/}
                {/*    Content of tab 1*/}
                {/*</Tabs.TabPane>*/}
                {/*<Tabs.TabPane tab="Details" key="25">*/}
                {/*    Content of tab 255*/}
                {/*</Tabs.TabPane>*/}
                {/*<Tabs.TabPane tab="History" key="25">*/}
                {/*    Content of tab 255*/}
                {/*</Tabs.TabPane>*/}
                {/*<Tabs.TabPane tab="Followers" key="21">*/}
                {/*    Content of tab 255*/}
                {/*</Tabs.TabPane>*/}
                {/*<Tabs.TabPane tab="Follows" key="2">*/}
                {/*    Content of tab 2*/}
                {/*</Tabs.TabPane>*/}
                {/*<Tabs.TabPane tab="My Activities" key="3">*/}
                {/*    Content of tab 3*/}
                {/*</Tabs.TabPane>*/}
                {/*</Tabs>*/}
                {/*</Col>*/}
                <Col sm={16} style={{margin: `16px 0 `}} border="true">

                    <Descriptions title={
                        <>
                            Personal Details
                            <Divider style={{marginTop: 8}}/>
                        </>
                    } layout="horizontal">
                        <Descriptions.Item label="Name">{profile.name}</Descriptions.Item>
                        <Descriptions.Item label="Username">{profile.useranme}</Descriptions.Item>
                        <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
                        <Descriptions.Item label="Mobile">{profile.mobile}</Descriptions.Item>
                        <Descriptions.Item label="Address" span={2}>
                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                        </Descriptions.Item>
                    </Descriptions>

                    {!_.isEmpty(profile.professionals) && <>

                        <Title level={4} style={{fontSize: 17, marginTop: 8}}>
                            Professionals Details
                        </Title>

                        {profile.professionals.map((prof, index) => (
                            <Descriptions key={index} title={<Divider style={{margin: 0}}/>} layout="horizontal">
                                <Descriptions.Item label="Organisation">{prof.organization}</Descriptions.Item>
                                <Descriptions.Item label="Designation">{prof.designation}</Descriptions.Item>
                            </Descriptions>
                        ))}

                    </>}

                    {!_.isEmpty(profile.academics) && <>
                        <Title level={4} style={{fontSize: 17, marginTop: 8}}>
                            Educational Details
                        </Title>

                        {profile.academics.map((acad, index) => (
                            <Descriptions key={index} title={<Divider style={{margin: 0}}/>} layout="horizontal">
                                <Descriptions.Item label="Programme">{acad.programme}</Descriptions.Item>
                                <Descriptions.Item label="Branch">{acad.branch}</Descriptions.Item>
                                <Descriptions.Item label="College/Institute">{acad.institute}</Descriptions.Item>
                                <Descriptions.Item label="Batch">{acad.batch}</Descriptions.Item>
                                <Descriptions.Item label="Regd. No.">{acad.registration}</Descriptions.Item>
                            </Descriptions>
                        ))}

                    </>}


                </Col>
            </Row>
        );
    }
}

export default About;