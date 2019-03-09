import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { Table } from 'antd';
import { get } from 'lodash';

import LayoutContainer from '../common/LayoutContainer';

export default class Products extends Component {
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.shape({}),
  };

  columns = [
    { title: I18n.t('orderTableTitles.name'), dataIndex: 'name', key: 'name' },
    { title: I18n.t('orderTableTitles.address'), dataIndex: 'description', key: 'description' },
    { title: I18n.t('orderTableTitles.address'), dataIndex: 'price', key: 'price' },
  ];

  componentDidMount() {
    const { products: { fetched }, getProducts } = this.props;

    if (!fetched) {
      getProducts();
    }
  }

  render() {
    const items = get(this.props, 'products.items', []);
  
    return (
      <LayoutContainer title={I18n.t('routesNames.products')}>
        <Table
          locale={{ emptyText: I18n.t('noData') }}
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={items}
          pagination={{ hideOnSinglePage: true, pageSize: 10 }}
        />
      </LayoutContainer>
    );
  }
}
