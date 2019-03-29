import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, reduce, map, isEqual } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { Table, Modal, Input, Select, Tag } from 'antd';

import LayoutContainer from '../common/LayoutContainer';
import { STATUS_TYPE } from '../../constants';
import orderActions from '../../redux/actions/orders';
import { parseDate, getStatusTypeByConstant, getOrderItems } from '../../utils';

import css from './Orders.scss';


class Orders extends Component {
  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    updateOrder: PropTypes.func.isRequired,
    orders: PropTypes.shape({}),
  };

  state = { isModalOpen: false, confirmLoading: false, editItem: null };

  columns = [
    { title: I18n.t('orderTableTitles.name'), dataIndex: 'name', key: 'name' },
    { title: I18n.t('orderTableTitles.phone'), dataIndex: 'phone', key: 'phone' },
    { title: I18n.t('orderTableTitles.address'), dataIndex: 'address', key: 'address' },
    { 
      title: I18n.t('orderTableTitles.status'),
      dataIndex: 'status',
      key: 'status',
      render: item => <Tag color={getStatusTypeByConstant(I18n)(item).color}>{getStatusTypeByConstant(I18n)(item).title}</Tag>
    },
    { title: I18n.t('orderTableTitles.date'), dataIndex: 'date', key: 'date', render: item => parseDate(item) },
    { title: I18n.t('orderTableTitles.totalPrice'), dataIndex: 'totalPrice', key: 'totalPrice', render: item => `${item} ${I18n.t('currency')}` },
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
  ];

  componentDidMount() {
    const { orders: { fetched }, getOrders } = this.props;

    if (!fetched) {
      getOrders();
    }
  }

  get statusOptions() {
    return reduce(STATUS_TYPE, (acc, val, key) => {
      acc.push({ label: I18n.t(`statusTypes.${key}`), value: val });
      return acc;
    }, []);
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

  onEditClick = (data) => {
    console.log(data);
    this.setState({
      editItem: data,
      newAddress: data.address,
      newStatus: data.status,
      isModalOpen: true
    });
  }

  onModalOkClick = async () => {
    const { newAddress, editItem, newStatus } = this.state;

    if (!isEqual(newAddress, editItem.address) || !isEqual(newStatus, editItem.status)) {
      this.setState({ confirmLoading: true });

      await this.props.updateOrder({ ...editItem, address: newAddress, status: newStatus });

      this.setState({
        isModalOpen: false,
        confirmLoading: false,
        editItem: null,
        newAddress: '',
        newStatus: null
      });
    } else {
      this.setState({
        isModalOpen: false,
        editItem: null,
        newAddress: '',
        newStatus: null
      });
    }
  }

  onModalCancelClick = () => {
    this.setState({ isModalOpen: false, editItem: null });
  }

  onEditFieldChange = e => {
    if (get(e, 'target')) {
      this.setState({ newAddress: e.target.value });
    } else {
      this.setState({ newStatus: e });
    }
  }

  renderModalContent = () => {
    const { newAddress, newStatus } = this.state;

    return (
      <React.Fragment>
        <div className={css.inputField}>
          <p>{I18n.t('orderTableTitles.address')}</p>
          <Input id="address" onChange={this.onEditFieldChange} value={newAddress} />
        </div>

        <div className={css.inputField}>
          <p>{I18n.t('orderTableTitles.status')}</p>
          <Select id="status" value={newStatus} style={{ width: 200 }} onChange={this.onEditFieldChange}>
            { map(this.statusOptions, item => (
              <Select.Option
                key={`${item.label}-${item.value}`}
                value={item.value}
              >
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </React.Fragment>
    )
  }

  render() {
    const items = get(this.props, 'orders.items', []);
    const { isModalOpen, confirmLoading } = this.state;

    return (
      <LayoutContainer title={I18n.t('routesNames.orders')}>
        <Table
          locale={{ emptyText: I18n.t('noData') }}
          columns={this.columns}
          rowKey={record => record.id}
          expandedRowRender={this.expandedRowRender}
          dataSource={items}
          pagination={{ hideOnSinglePage: true, pageSize: 20 }}
        />
        <Modal
          title="Редактировать Заказ"
          visible={isModalOpen}
          onOk={this.onModalOkClick}
          confirmLoading={confirmLoading}
          onCancel={this.onModalCancelClick}
        >
          { this.renderModalContent() }
        </Modal>
      </LayoutContainer>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    updateOrder: data => dispatch(orderActions.updateOrder(data))
  })
)(Orders)
