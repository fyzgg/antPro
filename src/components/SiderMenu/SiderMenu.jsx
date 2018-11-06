import React, { PureComponent } from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import pathToRegexp from 'path-to-regexp';
import classNames from 'classnames';
import Link from 'umi/link';
import styles from './index.less';
import BaseMenu, { getMenuMatches } from './BaseMenu';
import { urlToList } from '../_utils/pathTools';

const { Sider } = Layout;

/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
const getDefaultCollapsedSubMenus = props => {
  const {
    location: { pathname },
    flatMenuKeys,
  } = props;
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item);
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  );

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
      currentMenu:'Ant Design Base'
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname } = state;
    if (props.location.pathname !== pathname) {
      return {
        pathname: props.location.pathname,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };
  menuChangeHandler = key => {
    this.setState({
      currentMenu: key
    })
  } 

  render() {
    const { logo, collapsed, onCollapse, fixSiderbar, theme } = this.props;
    const { currentMenu, openKeys } = this.state;
    //const openKeys = getDefaultCollapsedSubMenus(this.props);
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderbar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });    
    const menu = (
      <Menu >
        <Menu.Item key="Ant Design Base">
          <Link to="/base/dashboard/analysis">Ant Design Base</Link>
        </Menu.Item>
        <Menu.Item key="Ant Design Other">
          <Link to="/other/result/success">Ant Design Other</Link>
        </Menu.Item>
      </Menu>
    )

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo">
          <img src={logo} alt="logo" />
          <Dropdown overlay={menu}>
            <h1>{currentMenu}</h1>
          </Dropdown>
        </div>
        <BaseMenu
          {...this.props}
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          onOpenChange={this.handleOpenChange}
          style={{ padding: '16px 0', width: '100%', overflowX: 'hidden' }}
          {...defaultProps}
        />
      </Sider>
    );
  }
}
