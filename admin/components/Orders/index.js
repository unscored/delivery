import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { Table } from 'antd';

import LayoutContainer from '../common/LayoutContainer';
import { parseDate, getStatusTypeByConstant, getOrderItems } from '../../utils';

import css from './Orders.scss';


export default class Orders extends Component {
  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    orders: PropTypes.shape({}),
  };

  columns = [
    { title: I18n.t('orderTableTitles.name'), dataIndex: 'name', key: 'name' },
    { title: I18n.t('orderTableTitles.phone'), dataIndex: 'phone', key: 'phone' },
    { title: I18n.t('orderTableTitles.address'), dataIndex: 'address', key: 'address' },
    { title: I18n.t('orderTableTitles.status'), dataIndex: 'status', key: 'status', render: item => getStatusTypeByConstant(I18n)(item) },
    { title: I18n.t('orderTableTitles.date'), dataIndex: 'date', key: 'date', render: item => parseDate(item) },
    { title: I18n.t('orderTableTitles.totalPrice'), dataIndex: 'totalPrice', key: 'totalPrice', render: item => `${item} ${I18n.t('currency')}` },
  ];

  componentDidMount() {
    const { orders: { fetched }, getOrders } = this.props;

    if (!fetched) {
      getOrders();
    }
  }

  expandedRowRender = record => {
    const data = getOrderItems(I18n)(record.orderList);

    return (
      <div>
        {data.map((item, i) => (
          <p key={i} style={{ margin: 0 }}>{`${i+1}. ${item}`}</p>
        ))}
      </div>
    );
  }

  render() {
    const items = get(this.props, 'orders.items', []);

    return (
      <LayoutContainer title={I18n.t('routesNames.orders')}>
        <Table
          locale={{ emptyText: I18n.t('noData') }}
          columns={this.columns}
          rowKey={record => record.id}
          expandedRowRender={this.expandedRowRender}
          dataSource={items}
          pagination={{ hideOnSinglePage: true, pageSize: 10 }}
        />
      </LayoutContainer>
    );
  }
}
