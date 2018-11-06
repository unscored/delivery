import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { Redirect } from 'react-router-dom';
import { Form, Input, Icon, Button } from 'antd';



import css from './LogIn.scss';
import { ROUTES_MAP } from '../../constants';

const LogIn = props => {
  const {
    login,
    form,
    user: { name, password, token },
    updateUserInfo,
  } = props;
  const { getFieldDecorator } = form;
  const onLogin = e => {
    e.preventDefault();

    props.form.validateFields(err => {
      if (!err) {
        login({name, password});
      }
    });
  };

  return (
    !token ? (
      <div className={css.loginContent}>
        <div className={css.loginIcon}>
          <Icon type="user" style={{ fontSize: '40px', color: 'white' }} />
        </div>
        <Form onSubmit={onLogin} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: I18n.t('form.emptyName') }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={I18n.t('login')}
                onChange={updateUserInfo}
                id="name"
                name="name"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: I18n.t('form.emptyPassword') }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                type="password"
                id="password"
                name="password"
                placeholder={I18n.t('password')}
                onChange={updateUserInfo}
              />
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" className={css.loginFormButton}>
            {I18n.t('enter')}
          </Button>
        </Form>


      </div>
    )
    : <Redirect to={ROUTES_MAP.main} />
  );
}

export default Form.create()(LogIn);
