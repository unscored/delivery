import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { FORMS } from '../reducers/user';
import actions from '../actions/user';

export default connect(
  ({ user }) => ({
    placeholder: I18n.t('yourPhone'),
    mask: ['+', '3', '8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
    name: FORMS.phone,
    value: user.phone,
  }),
  dispatch => ({
    onChange: e => {
      const { value: phone } = e.target;
      dispatch(actions.updateUserInfo({ phone }));
    },
    onBlur: e => {
      const { value } = e.target;
      dispatch(actions.validateOne({ [`${FORMS.phone}`]: value }));       
    }
  })
);