import React, {Component} from 'react';
import {connect} from "react-redux";
import {Drawer, Layout, Menu, Icon} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import Logo from 'assets/saa-logo.png'

const {Header, Content, Footer, Sider} = Layout;

const styles = theme => ({
    fixed: {
        height: '100vh',
        position: 'absolute',
    },
    header: {
        float: 'left',
        textAlign: 'left',
        background: 'transparent',
    },
    content: {
        padding: 24,
        background: '#fff',
        minHeight: 360,
        [theme.breakpoints.up('sm')]: {
            margin: '24px 16px 0',
        }
    }
});


class PublicNavBarTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            breakPoint: false,
            selected: null,
            auth: false,
        }
    }

    changeMenuSelection = (props) => {
        let {pathname} = props.location;
        pathname = pathname === '/' ? '/' : pathname.split('/').filter(x => x).join('/');
        this.setState({selected: pathname})
    };

    componentDidMount() {
        this.changeMenuSelection(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.changeMenuSelection(nextProps);
    }

    toggle = () => this.setState({collapsed: !this.state.collapsed});

    loginLogout = () => {
        const {auth} = this.props;
        return auth ? <Menu.Item key="38">Profile</Menu.Item> : <Menu.Item key="login"><Link to={'/login'}>
            Login
        </Link></Menu.Item>;
    };

    render() {
        const {collapsed, breakPoint, selected} = this.state;
        const {classes, children} = this.props;
        return (
            <Layout >
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={this.toggle}
                    visible={!collapsed}
                    zIndex={999}
                    width='0'
                />
                <Sider
                    trigger={null}
                    breakpoint="lg"
                    collapsedWidth="0"
                    className={breakPoint ? classes.fixed : null}
                    onBreakpoint={(broken) => {
                        this.setState({breakPoint: broken});
                        if (!broken) this.setState({collapsed: !broken})
                    }}
                    collapsed={collapsed}
                    style={{zIndex: 1000}}
                >
                    <div className="logo"/>

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[selected]}
                        // style={{overflow: 'auto', height: '100vh'}}
                    >
                        <Menu.Item key="/">
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
                                selectedKeys={[selected]}
                                style={{lineHeight: '64px', textAlign: 'right', padding: '0 8px'}}
                                overflowedIndicator={
                                    <Icon
                                        style={{padding: 0, fontSize: 24, lineHeight: '64px'}}
                                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                    />
                                }
                            >

                                <Menu.Item key={null} className={classes.header}>
                                    <Link to={'/'}>
                                        <img src={Logo} alt="" style={{height: 64}}/>
                                    </Link>
                                </Menu.Item>

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

                                {this.loginLogout()}

                            </Menu>
                        </div>
                        <div style={{display: breakPoint ? null : 'none'}}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                selectedKeys={[selected]}
                                style={{lineHeight: '64px', textAlign: 'right', padding: '0 8px'}}
                            >
                                <Menu.Item key={'logo'} className={classes.header}>
                                    <img src={Logo} alt="" style={{height: 64}}/>
                                </Menu.Item>
                                <Menu.Item key={'65'} onClick={this.toggle}>
                                    <Icon type="menu" style={{margin: 0, fontSize: 24, verticalAlign: 'middle'}}/>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Header>
                    <Content className={classes.content}>
                        {children}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        SLIET Alumni Association ©{new Date().getFullYear()} Created by Student Alumni Cell
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = ({auth}) => ({
    auth: auth.isAuthenticated
});
export default connect(mapStateToProps)(withStyles(styles)(withRouter(PublicNavBarTest)));
