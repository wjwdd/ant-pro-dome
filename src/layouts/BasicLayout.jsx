/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React, { useState } from 'react';
import Authorized from '@/utils/Authorized';
import Link from 'umi/link';
import RightContent from '@/components/GlobalHeader/RightContent';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { isAntDesignPro } from '@/utils/utils';
import logo from '../assets/logo.svg';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Context from './MenuContext';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const footerRender = (_, defaultDom) => {
  if (!isAntDesignPro()) {
    return defaultDom;
  }

  return (
    <>
      {defaultDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout = props => {
  const { dispatch, children, settings, route: { routes, path, authority }, } = props;
  /**
   * constructor
   */

  useState(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
      dispatch({
        type: 'menu/getMenuData',
        payload: { routes, path, authority },
      });
    }
  });
  /**
   * init variables
   */

  const handleMenuCollapse = payload =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  const getContext=()=> {
    const { location, breadcrumbNameMap } = props;
    return {
      location,
      breadcrumbNameMap,
    };
  }
  return (
    <Context.Provider value={getContext()}>
               
      <ProLayout
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => (
          <Link to={menuItemProps.path}>{defaultDom}</Link>
        )}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        layout={'sidemenu'}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {children}
      </ProLayout>
    </Context.Provider>
  );
};
const a=({global, settings, menu})=>{
  return {
    collapsed: global.collapsed,
    settings,
    breadcrumbNameMap: menu.breadcrumbNameMap,
  }
}
export default connect(a)(BasicLayout);
