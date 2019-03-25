import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { Table } from 'antd';
import { get } from 'lodash';

import LayoutContainer from '../common/LayoutContainer';

export default class Clients extends Component {
  static propTypes = {
    getClients: PropTypes.func.isRequired,
    clients: PropTypes.shape({}),
  };

  columns = [
    { title: I18n.t('orderTableTitles.name'), dataIndex: 'name', key: 'name' },
    { title: I18n.t('orderTableTitles.phone'), dataIndex: 'phone', key: 'phone' }
  ];

  componentDidMount() {
    const { clients: { fetched }, getClients } = this.props;

    if (!fetched) {
      getClients();
    }
  }

  render() {
    const items = get(this.props, 'clients.items', []);
  
    return (
      <LayoutContainer title={I18n.t('routesNames.clients')}>
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
