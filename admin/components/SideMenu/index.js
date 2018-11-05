import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { I18n } from 'react-redux-i18n';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { ROUTES_MAP, hideArray } from '../../constants';
import Header from '../Header';

import css from './SideMenu.scss';


const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component {
  state = {
    isCollapsed: true
  }

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    })
  };

  handleCollapseClick = () => {
     this.setState(prevState => ({
       isCollapsed: !prevState.isCollapsed,
     }));
  }
  
  render() {
    const { isCollapsed } = this.state;
    const { location: { pathname } } = this.props;

    return (
      !hideArray.includes(location.pathname) && (
        <Sider
          width={250}
          style={{
            overflow: 'auto',
            marginTop: Header.CSS.headerH,
            height: `calc(100vh - ${Header.CSS.headerH})`,
            position: 'fixed',
            left: 0,
          }}
          >
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0, paddingTop: 20 }}
          >
            <Menu.Item key={ROUTES_MAP.main}>
              
              <Link to={ROUTES_MAP.main}>
                <Icon type="appstore" theme="outlined" style={{ fontSize: 20 }} />
                <span>{I18n.t('routesNames.main')}</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={ROUTES_MAP.orders}>
              <Link to={ROUTES_MAP.orders}>
                <Icon type="shopping-cart" style={{ fontSize: 20 }} />
                <span>{I18n.t('routesNames.orders')}</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={ROUTES_MAP.clients}>
              <Link to={ROUTES_MAP.clients}>
                <Icon type="team" style={{ fontSize: 20 }} />
                <span>{I18n.t('routesNames.clients')}</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={ROUTES_MAP.products}>
              <Link to={ROUTES_MAP.products}>
                <Icon type="hdd" theme="outlined" style={{ fontSize: 20 }} />
                <span>{I18n.t('routesNames.products')}</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      )
    );
  }
};

export default withRouter(SideMenu);



{/* <div className={isCollapsed ? classNames(css.sideMenu, css.collapsed) : css.sideMenu}>
          <div className={css.control}>
            <div onClick={this.handleCollapseClick} className={css.button}>
              {this.renderControlIcon()}
            </div>
          </div>
          <ul className={css.nav}>
            <li>
              <Link to={ROUTES_MAP.main}>
                <MdDashboard size={24} color={css.iconsColor} />
                <p>Главная</p>
              </Link>
            </li>
            <li>
              <Link to={ROUTES_MAP.orders}>
                <MdShoppingCart size={24} color={css.iconsColor} />
                <p>Заказы</p>
              </Link>
            </li>
            <li>
              <Link to={ROUTES_MAP.clients}>
                <MdSupervisorAccount size={24} color={css.iconsColor} />
                <p>Клиенты</p>
              </Link>
            </li>
          </ul>
        </div> */}