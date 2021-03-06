import React, {Component} from 'react'

import {Layout, Menu, Breadcrumb} from 'antd';

import Logo from "assets/saa-logo.png";

const {Header, Content, Footer} = Layout;


export default class header extends Component {
    render() {
        return (
            <Layout>
                <Header style={{position: 'sticky', top: 0, zIndex: 1, width: '100%'}}>
                    <div className="">
                        <img src={Logo} style={{maxHeight: 64, float: 'left'}} alt='saa-logo'/>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px', marginTop: 64}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                        <Breadcrumb.Item>Divyanshu</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{background: '#fff', padding: 24, minHeight: 980}}>Content</div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        )
    }
}
