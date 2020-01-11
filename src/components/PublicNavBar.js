import React, {Component} from 'react';
import {connect} from "react-redux";
import {Drawer, Layout, Menu, Icon, Button, Tooltip} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import Logo from 'assets/saa-logo.png'
import AccessControl, {checkPermissions} from "../AccessControl/AccessControl";
import {logout} from "../actions/authAction";

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
        paddingTop: 8,
        // background: '#fff',
        minHeight: '83vh',
        [theme.breakpoints.up('sm')]: {
            margin: '24px 16px 0',
        },
        [theme.breakpoints.down('sm')]: {
            padding: 8,
        }
    },
    logout: {
        '& i': {
            marginRight: '0 !important'
        }
    },
});


class PublicNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            breakPoint: false,
            selected: null,
            auth: false,
            dashboard: false,
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

    static getDerivedStateFromProps(nextProps, prevState) {
        let {pathname} = nextProps.location;
        pathname = pathname === '/' ? '/' : pathname.split('/').filter(x => x).join('/');
        return {selected: pathname, dashboard: checkPermissions(nextProps.userPermissions, ['sac'])}
    }


    toggle = () => this.setState({collapsed: !this.state.collapsed});

    loginLogout = (sidebar) => {
        const {auth, classes, onLogout} = this.props;
        const {dashboard} = this.state;
        const menuItems = [];
        if (auth) {
            menuItems.push(
                <Menu.Item key="profile">
                    <Link to={'/profile'}>{sidebar && <Icon type="profile"/>} Profile</Link>
                </Menu.Item>
            );

            dashboard && menuItems.push(
                <Menu.Item key="sac-home" style={{display: !dashboard && "none"}}>
                    <AccessControl
                        key={"dashboard-access-control"}
                        allowedPermissions={['sac']}
                    >
                        <Link to={'/sac'}>{sidebar && <Icon type="dashboard"/>} Dashboard</Link>
                    </AccessControl>
                </Menu.Item>
            );

            menuItems.push(
                <Menu.Item key="logout">
                    <Tooltip placement="right" title='Logout'>
                        <Button
                            type="primary"
                            icon="logout"
                            className={classes.logout}
                            onClick={onLogout}
                        >
                            {sidebar && 'Logout'}
                        </Button>
                    </Tooltip>
                </Menu.Item>
            );
        } else {
            menuItems.push(
                <Menu.Item key="login">
                    <Link to={'/login'}>{sidebar && <Icon type="login"/>} Login</Link>
                </Menu.Item>
            );
        }

        return menuItems;
    };

    render() {
        const {collapsed, breakPoint, selected} = this.state;
        const {classes, children} = this.props;
        return (
            <Layout>
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
                    <div className="logo">
                        <Link to={'/'}>
                            <img src={Logo} alt="" style={{height: '100%'}}/>
                        </Link>
                    </div>

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[selected]}
                          style={{overflow: 'auto', height: 'calc(100vh - 64px)'}}
                    >

                        <Menu.Item key="/">
                            <Link to={'/'}>
                                <Icon type="home"/>
                                Home
                            </Link>
                        </Menu.Item>

                        <Menu.SubMenu title={<span><Icon type="video-camera"/>About</span>}>
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

                        <Menu.SubMenu title={<span><Icon type="user"/>Committee</span>}>
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
                                <Icon type="picture"/>
                                Gallery
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="contact">
                            <Link to={'/contact'}>
                                <Icon type="contacts"/>
                                Contact Us
                            </Link>
                        </Menu.Item>

                        {this.loginLogout(true)}

                        <div style={{marginBottom: 40}}/>

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
                                    <Link to={'/'}>
                                        <img src={Logo} alt="" style={{height: 64}}/>
                                    </Link>
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

PublicNavBar.defaultProps = {
    userPermissions: []
};

const mapStateToProps = ({auth}) => ({
    auth: auth.isAuthenticated,
    userPermissions: auth.isAuthenticated && auth.user && auth.user.permissions
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(PublicNavBar)));
