import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import Logo from 'assets/saa-logo.png'
import {Link} from "react-router-dom";

const {Header, Content, Footer, Sider} = Layout;

const styles = ({
    fixed: {
        height: '100vh',
        position: 'absolute',
    },
    header: {
        float: 'left',
        textAlign: 'left',
        background: 'transparent',
    }
});


class Responsive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            breakPoint: false,
            auth: false,
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    loginLogout = () => {
        const {auth} = this.state;
        return auth ? <Menu.Item key="38">Profile</Menu.Item> : <Menu.Item key="35">Login</Menu.Item>;
    };

    render() {
        const {collapsed, breakPoint} = this.state;
        return (
            <Layout hasSider={true}>
                <Sider
                    trigger={null}
                    breakpoint="lg"
                    collapsedWidth="0"
                    style={breakPoint ? styles.fixed : null}
                    onBreakpoint={(broken) => {
                        this.setState({collapsed: broken, breakPoint: broken});
                        if (!broken) this.setState({collapsed: !broken})

                    }}
                    onCollapse={(collapsed, type) => {
                        // console.log(collapsed, type);
                    }}
                    collapsed={collapsed}

                >
                    <div className="logo"/>
                    {breakPoint && <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}
                        // style={{overflow: 'auto', height: '100vh'}}
                    >
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera"/>
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload"/>
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user"/>
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <div style={{display: breakPoint ? 'none' : null}}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{lineHeight: '64px', textAlign: 'right', padding: '0 8px'}}
                                // overflowedIndicator={
                                //     <Icon
                                //         style={{padding: 0, textAlign: 'right', fontSize: 24, lineHeight: '64px'}}
                                //         className=""
                                //         type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                //     />
                                // }
                            >

                                <Menu.Item key={null}
                                           style={styles.header}
                                >
                                    <Link to={'home'}>
                                        <img src={Logo} alt="" style={{height: 64}}/>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="1">
                                    <Link to={'/'}>
                                        Home
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">About</Menu.Item>
                                <Menu.SubMenu title="Committee">
                                    <Menu.Item key="setting:1">Advisory</Menu.Item>
                                    <Menu.Item key="setting:2">Executive</Menu.Item>
                                </Menu.SubMenu>
                                <Menu.Item key="3">Contact Us</Menu.Item>
                                {this.loginLogout()}

                            </Menu>
                        </div>
                        <div style={{display: breakPoint ? null : 'none'}}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{lineHeight: '64px', textAlign: 'right', padding: '0 8px'}}
                                overflowedIndicator={
                                    <Icon
                                        style={{padding: 0, textAlign: 'right', fontSize: 24, lineHeight: '64px'}}
                                        className=""
                                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                    />
                                }
                            >

                                <Menu.Item key={'65'} style={styles.header}>
                                    <img src={Logo} alt="" style={{height: 64}}/>
                                </Menu.Item>
                                {this.loginLogout()}
                            </Menu>
                        </div>
                    </Header>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            content
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        SLIET Alumni Association ©{new Date().getFullYear()} Created by Student Alumni Cell
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Responsive;
