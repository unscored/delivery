import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { I18n } from 'react-redux-i18n';

import Button from '../../Button';
import { Header, Footer } from '../PopUp';

import * as css from './Info.scss';

const Info = ({ handleOkClick, content, title }) => {
	const onOkClick = () => {
    handleOkClick();
  }

	return (
		<div className={css.info}>
			<div className={css.infoContent}>
				<Header title={title} />

				<div className={css.middle}>{content}</div>

				<Footer>
          <Button
            value={I18n.t('ok')}
            onClick={onOkClick}
            primary
          />
				</Footer>
			</div>
		</div>
	);
};

Info.propTypes = {
	handleOkClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default Info;
