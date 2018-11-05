import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import css from './LayoutContainer.scss';
import withSiderCollapse from '../../../redux/decorators/withSiderCollapse';


const { Content } = Layout;

const LayoutContainer = ({ className, title, children, isCollapsed }) => (
  <Layout>
    <Content className={isCollapsed ? classNames(css.content, css.siderCollapse) : css.content}>
      <div className={css.title}>
        <h1>{title}</h1>
      </div>
      <div className={classNames('layoutContainerContent', className ? `${className}Content` : '')}>
        {children}
      </div>
    </Content>
  </Layout>
);

LayoutContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  isCollapsed: PropTypes.bool,
};

export default  withSiderCollapse(LayoutContainer);