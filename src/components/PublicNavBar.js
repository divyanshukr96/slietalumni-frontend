import React, {Component} from 'react';
import {connect} from "react-redux";
import {Drawer, Layout, Menu, Icon, Button, Tooltip} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import Logo from 'assets/saa-logo.png'
import AccessControl, {checkPermissions} from "AccessControl/AccessControl";
import {logout} from "actions/authAction";

const {Header, Content, Footer} = Layout;

const styles = theme => ({
    header: {
        [theme.breakpoints.down(992)]: {
            display: 'none'
        },
    },
    headerMobile: {
        [theme.breakpoints.up(992)]: {
            display: 'none'
        },
    },
    headerLogo: {
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
            margin: '12px 16px 0',
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

const LogoButton = () => (
    <Link to={'/'}>
        <img src={Logo} alt="" style={{height: 64}}/>
    </Link>
);

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
        let collapsed = prevState.collapsed;
        pathname = pathname === '/' ? '/' : pathname.split('/').filter(x => x).join('/');
        if (prevState.selected !== pathname && !collapsed) {
            collapsed = true;
        }
        return {
            selected: pathname,
            collapsed: collapsed,
            dashboard: checkPermissions(nextProps.userPermissions, ['sac'])
        }
    }


    toggle = () => this.setState({collapsed: !this.state.collapsed});

    menuItems = (sidebar) => {
        const {auth, classes, onLogout} = this.props;
        const {dashboard} = this.state;
        const menuItems = [
            <Menu.Item key="/">
                <Link to={'/'}>
                    {sidebar && <Icon type="home"/>}
                    Home
                </Link>
            </Menu.Item>,

            <Menu.SubMenu key="about" title={<span>{sidebar && <Icon type="video-camera"/>}About</span>}>
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
            </Menu.SubMenu>,

            <Menu.SubMenu key="committee" title={<span>{sidebar && <Icon type="user"/>}Committee</span>}>
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
            </Menu.SubMenu>,

            <Menu.Item key="gallery">
                < Link to={'/gallery'}>
                    {sidebar && <Icon type="picture"/>}
                    Gallery
                </Link>
            </Menu.Item>,

            <Menu.Item key="contact">
                <Link to={'/contact'}>
                    {sidebar && <Icon type="contacts"/>}
                    Contact Us
                </Link>
            </Menu.Item>
        ];
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

            sidebar && menuItems.push(<Menu.Divider key="logout-divider"/>);

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
            sidebar && menuItems.push(<Menu.Divider key="login-divider"/>);
            menuItems.push(
                <Menu.Item key="login">
                    <Link to={'/login'}>{sidebar && <Icon type="login"/>} Login</Link>
                </Menu.Item>
            );
        }

        return menuItems;
    };

    render() {
        const {collapsed, selected} = this.state;
        const {classes, children} = this.props;

        const menuProps = {
            theme: "dark",
            mode: "horizontal",
            selectedKeys: [selected],
            style: {lineHeight: '64px', textAlign: 'right', padding: '0 8px'}
        };

        return (
            <Layout>
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={this.toggle}
                    visible={!collapsed}
                    zIndex={999}
                    width='200'
                    bodyStyle={{
                        padding: 0,
                        background: '#001529',
                        height: '100%',
                    }}
                >
                    <div className="logo" style={{marginTop: 0, marginBottom: 10}}>
                        <LogoButton/>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[selected]}
                        style={{overflow: 'auto'}}
                    >
                        {this.menuItems(true)}

                        <div style={{marginBottom: 40}}/>

                    </Menu>
                </Drawer>
                <Header style={{background: '#001529', padding: 0}}>
                    <div className={classes.header}>
                        <Menu {...menuProps} >

                            <Menu.Item key={null} className={classes.headerLogo}>
                                <LogoButton/>
                            </Menu.Item>

                            {this.menuItems()}

                        </Menu>
                    </div>
                    <div className={classes.headerMobile}>
                        <Menu {...menuProps} >
                            <Menu.Item key={'logo'} className={classes.headerLogo}>
                                <LogoButton/>
                            </Menu.Item>
                            <Menu.Item key={'65'} onClick={this.toggle}>
                                <Icon type="menu" style={{margin: 0, fontSize: 24, verticalAlign: 'middle'}}/>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Header>
                <Layout>
                    <Content className={classes.content}>
                        {children}
                    </Content>
                </Layout>
                <Footer style={{textAlign: 'center'}}>
                    SLIET Alumni Association ©{new Date().getFullYear()} Created by Student Alumni Cell
                </Footer>
            </Layout>
        );
    }
}

PublicNavBar.defaultProps = {
    userPermissions: []
};

const mapStateToProps = ({auth}) => ({
    auth: auth.isAuthenticated,
    userPermissions: (auth.isAuthenticated && auth.user && auth.user.permissions) || []
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(PublicNavBar)));
