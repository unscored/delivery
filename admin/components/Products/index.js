import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { Table, Button } from 'antd';
import { get } from 'lodash';

import LayoutContainer from '../common/LayoutContainer';
import * as css from './Products.scss';
import EditModal from './EditModal';

export const MODE = {
  CREATE: 'create',
  EDIT: 'edit'
};
export default class Products extends Component {
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.shape({}),
  };

  componentDidMount() {
    this.props.getProducts();
  }

  state = {
    isModalVisible: false,
    mode: MODE.CREATE,
    item: null
  }

  get columns() {
    return [
      { title: I18n.t('productsTableTitles.name'), dataIndex: 'name', key: 'name' },
      { title: I18n.t('productsTableTitles.description'), dataIndex: 'description', key: 'description' },
      { title: I18n.t('productsTableTitles.price'), dataIndex: 'price', key: 'price' },
      {
        title: I18n.t('orderTableTitles.action'),
        dataIndex: '',
        key: 'x',
        render: item => (
          <button
            className={css.editBtn}
            onClick={() => this.onEditClick(item)}
          >
            {I18n.t('edit')}
          </button>
        )
      },
    ]
  };

  onEditClick = item => {
    this.setState({
      isModalVisible: true,
      item,
      mode: MODE.EDIT
    });
  }

  onCanelModal = () => {
    this.setState({
      isModalVisible: false,
      item: null
    });
  }

  onConfirmModal = () => {
    this.setState({
      isModalVisible: false,
      item: null
    });
  }

  render() {
    const items = get(this.props, 'products.items', []);
    const { isModalVisible, mode } = this.state;
  
    return (
      <LayoutContainer title={I18n.t('routesNames.products')}>
        <div className={css.actionsPanel}>
          <Button type="primary">Добавить</Button>
        </div>
        <Table
          locale={{ emptyText: I18n.t('noData') }}
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={items}
          pagination={{ hideOnSinglePage: true, pageSize: 20 }}
        />
        <EditModal onConfirm={this.onConfirmModal} onCancel={this.onCanelModal} visible={isModalVisible} mode={mode} />
      </LayoutContainer>
    );
  }
}
