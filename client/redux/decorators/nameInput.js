import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { FORMS } from '../reducers/user';
import actions from '../actions/user';

export default connect(
  ({ user }) => ({
    placeholder: I18n.t('yourName'),
    type: 'text',
    name: FORMS.name,
    value: user.name,
  }),
  dispatch => ({
    onChange: e => {
      const { value: name } = e.target;
      dispatch(actions.updateUserInfo({ name }));
    },
    onBlur: e => {
      const { value } = e.target;
      dispatch(actions.validateOne({ [`${FORMS.name}`]: value }));       
    }
  })
);