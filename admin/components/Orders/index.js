import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';

import LayoutContainer from '../common/LayoutContainer';
import { parseDate } from '../../utils';

import css from './Orders.scss';



export default class Orders extends Component {
  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    orders: PropTypes.shape({}),
  };

  componentDidMount() {
    const { orders: { fetched }, getOrders } = this.props;

    if (!fetched) {
      getOrders();
    }
  }

  render() {
    const items = get(this.props, 'orders.items', []);

    return (
      <LayoutContainer title={'Заказы'}>
        <Table className={css.table}>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{parseDate(row.date)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </LayoutContainer>
    );
  }
}
