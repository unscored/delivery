import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { FORMS } from '../reducers/user';
import actions from '../actions/user';

export default connect(
  ({ user }) => ({
    placeholder: I18n.t('yourAddress'),
    type: 'text',
    name: FORMS.address,
    value: user.address,
  }),
  dispatch => ({
    onChange: e => {
      const { value: address } = e.target;
      dispatch(actions.updateUserInfo({ address }));
    },
    onBlur: e => {
      const { value } = e.target;
      dispatch(actions.validateOne({ [`${FORMS.address}`]: value }));       
    }
  })
);