import React, {Component} from 'react';
import {connect} from "react-redux";
import {Layout, Menu, Icon} from 'antd';
import {Link, Redirect} from "react-router-dom";
import {logout} from 'actions/authAction';
import Logo from "../assets/saa-logo.png";

const {Header, Content, Footer, Sider} = Layout;

const styles = ({
    fixed: {
        height: '100vh',
        position: 'absolute',
        zIndex: 1000,
    },
});

class AdminNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            breakPoint: null,
            selected: null,
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
        return {selected: pathname}
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const {collapsed, breakPoint, selected} = this.state;
        const {children, auth, onLogout} = this.props;
        if (!auth) return <Redirect to={'/login'}/>;
        return (
            <Layout hasSider={true}>
                <Sider
                    trigger={null}
                    breakpoint="lg"
                    collapsedWidth={breakPoint ? 0 : 80}
                    style={breakPoint ? styles.fixed : null}
                    onBreakpoint={(broken) => {
                        this.setState({collapsed: broken, breakPoint: broken})
                    }}
                    onCollapse={(collapsed, type) => {
                        // console.log(collapsed, type);
                    }}
                    collapsed={collapsed}
                >
                    <div className="logo">
                        <Link to={'/'}>
                            <img src={Logo} alt="" style={{height: '100%', maxWidth: '100%'}}/>
                        </Link>
                    </div>
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <Menu theme="dark" mode="inline" selectedKeys={[selected]}
                        // style={{overflow: 'auto', height: '100vh'}}
                    >

                        <Menu.SubMenu
                            key="images"
                            title={<span><Icon type="picture"/><span>Images</span></span>}
                        >
                            <Menu.Item key="sac/images/carousel">
                                <Link to={'/sac/images/carousel'}>
                                    <span className="nav-text">Home Carousel</span>
                                </Link>
                            </Menu.Item>

                        </Menu.SubMenu>

                        <Menu.Item key="sac/featured-alumni">
                            <Link to={'/sac/featured-alumni'}>
                                <Icon type="user"/>
                                <span className="nav-text">Featured Alumni</span>
                            </Link>
                        </Menu.Item>

                        <Menu.SubMenu
                            key="news"
                            title={<span><Icon type="calendar"/><span>News</span></span>}
                        >
                            <Menu.Item key="sac/news">
                                <Link to={'/sac/news'}>
                                    <span className="nav-text">All News</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="sac/news/published">
                                <Link to={'/sac/news/published'}>
                                    <span className="nav-text">Published News</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="sac/news/unpublished">
                                <Link to={'/sac/news/unpublished'}>
                                    <span className="nav-text">Un-Published News</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="sac/news/create">
                                <Link to={'/sac/news/create'}>
                                    <span className="nav-text">Add New News</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>


                        <Menu.SubMenu
                            key="member"
                            title={<span><Icon type="calendar"/><span>Member</span></span>}
                        >
                            <Menu.Item key="sac/member/executive">
                                <Link to={'/sac/member/executive'}>
                                    <span className="nav-text">SAA Executive</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="sac/member">
                                <Link to={'/sac/member'}>
                                    <span className="nav-text">SAC</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>


                        {/*<Menu.Item key="sac/news">*/}
                        {/*    <Link to={'/sac/news'}>*/}
                        {/*        <Icon type="calendar"/>*/}
                        {/*        <span className="nav-text">News</span>*/}
                        {/*    </Link>*/}
                        {/*</Menu.Item>*/}

                        {/*<Menu.Item key="sac/events">*/}
                        {/*    <Link to={'/sac/events'}>*/}
                        {/*        <Icon type="schedule"/>*/}
                        {/*        <span className="nav-text">Events</span>*/}
                        {/*    </Link>*/}
                        {/*</Menu.Item>*/}

                        <Menu.SubMenu
                            key="events"
                            title={<span><Icon type="schedule"/><span>Events</span></span>}
                        >
                            <Menu.Item key="sac/events">
                                <Link to={'/sac/events'}>
                                    <span className="nav-text">All Event</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="sac/events/published">
                                <Link to={'/sac/events/published'}>
                                    <span className="nav-text">Published Event</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="sac/events/unpublished">
                                <Link to={'/sac/events/unpublished'}>
                                    <span className="nav-text">Un-Published Event</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="sac/events/create">
                                <Link to={'/sac/events/create'}>
                                    <span className="nav-text">Add New Event</span>
                                </Link>
                            </Menu.Item>

                            <Menu.Item key="sac/event-type">
                                <Link to={'/sac/event-type'}>
                                    <span className="nav-text">Event Types</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>


                        <Menu.Item key="sac/users">
                            <Link to={'/sac/users'}>
                                <Icon type="team"/>
                                <span className="nav-text">Users</span>
                            </Link>
                        </Menu.Item>

                        <Menu.SubMenu
                            key="role-permission"
                            title={<span><Icon type="laptop"/><span>Role & Permission</span></span>}
                        >
                            <Menu.Item key="sac/roles">
                                <Link to={'/sac/roles'}>
                                    <span className="nav-text">Roles</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="sac/permissions">
                                <Link to={'/sac/permissions'}>
                                    <span className="nav-text">Permissions</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>

                        <Menu.Item key="sac/new-registration">
                            <Link to={'/sac/new-registration'}>
                                <Icon type="user-add"/>
                                <span className="nav-text">New Registration</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="sac/alumni-database">
                            <Link to={'/sac/alumni-database'}>
                                <Icon type="user"/>
                                <span className="nav-text">Alumni Database</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="sac/alumni-meet">
                            <Link to={'/sac/alumni-meet'}>
                                <Icon type="user"/>
                                <span className="nav-text">Alumni Meet</span>
                            </Link>
                        </Menu.Item>

                        {auth && <Menu.Divider/>}
                        {auth && <Menu.Item key="logout" onClick={onLogout}>
                            <Icon type="logout"/>
                            <span className="nav-text">Logout</span>
                        </Menu.Item>}
                    </Menu>
                </Sider>
                <Layout style={{minHeight: '100vh'}}>
                    <Header style={{background: '#fff', padding: 0, paddingLeft: 50}}>
                        <div style={{fontSize: 18, fontWeight: 700}}>
                            Admin Dashboard
                        </div>
                    </Header>
                    <Content style={{margin: '24px 16px 0'}}>
                        <div style={{padding: `24px 8px`, background: '#fff', minHeight: 360}}>
                            {children}
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

const mapStateToProps = ({auth}) => ({
    auth: auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavBar);
