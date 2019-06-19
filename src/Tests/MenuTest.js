/* eslint no-console:0 */

import React from 'react';
import PropTypes from 'prop-types';
// import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import { Menu} from 'antd/lib/index';


const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const Divider = Menu.Divider;

function handleClick(info) {
    console.log(`clicked ${info.key}`);
    console.log(info);
}




const nestSubMenu = (
    <SubMenu
        title={
            <span className="submenu-title-wrapper">offset sub menu 2</span>
        }
        key="4"
        popupOffset={[10, 15]}
    >
        <MenuItem key="4-1">inner inner</MenuItem>
        <Divider/>
        <SubMenu
            key="4-2"
            title={<span className="submenu-title-wrapper">sub menu 1</span>}
        >
            <SubMenu title={<span className="submenu-title-wrapper">sub 4-2-0</span>} key="4-2-0">
                <MenuItem key="4-2-0-1">inner inner</MenuItem>
                <MenuItem key="4-2-0-2">inner inner2</MenuItem>
            </SubMenu>
            <MenuItem key="4-2-1">inn</MenuItem>
            <SubMenu title={<span className="submenu-title-wrapper">sub menu 4</span>} key="4-2-2">
                <MenuItem key="4-2-2-1">inner inner</MenuItem>
                <MenuItem key="4-2-2-2">inner inner2</MenuItem>
            </SubMenu>
            <SubMenu title={<span className="submenu-title-wrapper">sub menu 3</span>} key="4-2-3">
                <MenuItem key="4-2-3-1">inner inner</MenuItem>
                <MenuItem key="4-2-3-2">inner inner2</MenuItem>
            </SubMenu>
        </SubMenu>
    </SubMenu>
);

function onOpenChange(value) {
    console.log('onOpenChange', value);
}

const children1 = [
    <SubMenu title={<span className="submenu-title-wrapper">sub menu</span>} key="1">
        <MenuItem key="1-1">0-1</MenuItem>
        <MenuItem key="1-2">0-2</MenuItem>
    </SubMenu>,
    nestSubMenu,
    <MenuItem key="2">1</MenuItem>,
    <MenuItem key="3">outer</MenuItem>,
    <MenuItem key="5" disabled>disabled</MenuItem>,
    <MenuItem key="6">outer3</MenuItem>,
];


const customizeIndicator = <span>Add More Items</span>;

class CommonMenu extends React.Component {
    state={
        children: children1,
        overflowedIndicator: undefined,
    }

    toggleOverflowedIndicator = () => {
        this.setState({
            overflowedIndicator:
                this.state.overflowedIndicator === undefined ?
                    customizeIndicator :
                    undefined,
        });
    };
    render() {
        const { triggerSubMenuAction } = this.props;
        const { children, overflowedIndicator } = this.state;
        return (
            <div>
                {this.props.updateChildrenAndOverflowedIndicator && <div>
                    <button onClick={this.toggleOverflowedIndicator}>toggle overflowedIndicator</button>
                </div>}
                <Menu
                    onClick={handleClick}
                    triggerSubMenuAction={triggerSubMenuAction}
                    onOpenChange={onOpenChange}
                    selectedKeys={['3']}
                    mode={this.props.mode}
                    openAnimation={this.props.openAnimation}
                    defaultOpenKeys={this.props.defaultOpenKeys}
                    overflowedIndicator={overflowedIndicator}
                >
                    {children}
                </Menu>
            </div>
        );
    }
}

CommonMenu.propTypes = {
    mode: PropTypes.string,
    openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    triggerSubMenuAction: PropTypes.string,
    defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
    updateChildrenAndOverflowedIndicator: PropTypes.bool,
};

    const horizontalMenu2 = (
        <CommonMenu
            mode="horizontal"
            // use openTransition for antd
            openAnimation="slide-up"
            triggerSubMenuAction="click"
            updateChildrenAndOverflowedIndicator
        />
    );




class MenuTest extends React.Component {
    render() {
        return (
            <div style={{ margin: 20 }}>
                <h2>antd menu</h2>
                <div>
                    <h3>horizontal and click</h3>

                    <div style={{ margin: 20 }}>{horizontalMenu2}</div>
                </div>
            </div>
        );
    }
}

export default MenuTest;