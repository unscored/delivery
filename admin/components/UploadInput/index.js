import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon } from 'antd';

import * as css from './UploadInput.scss';

export default class UploadInput extends Component {
  static defaultProps = {
    onChange: () => {},
    imageUrl: null,
    showError: false,
    errorMessage: ''
  };

  static propTypes = {
    onChange: PropTypes.func,
    imageUrl: PropTypes.string,
    showError: PropTypes.bool,
    errorMessage: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      imageUrl: props.imageUrl,
      loading: false
    };

    this.reader = new FileReader();
  }

  getBase64 = (img, callback) => {
    this.reader.addEventListener('load', () => callback(this.reader.result));
    this.reader.readAsDataURL(img);
  }

  onFileInputChange = info => {
    this.getBase64(info.file, imageUrl => {
      this.setState({ imageUrl, loading: false });
      this.props.onChange(imageUrl);
    });
  }

  onDeleteBtnClick = () => {
    this.setState({ imageUrl: null });
    this.props.onChange(null);
  }

  beforeFileUpload = file => {
    this.setState({ loading: true });
    return false;
  }

  renderUploadButton = () => {
    const { loading } = this.state;

    return (
      <div>
        <Icon fill="#FFFFFF" type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Загрузить</div>
      </div>
    );
  }

  renderPreview = () => {
    const { imageUrl } = this.state;
  
    return imageUrl && (
      <div className={css.preview} style={{ backgroundImage: `url('${imageUrl}')` }}>
        <div className={css.previewOverlay} />
        <button className={css.deleteIcon} type="button" onClick={this.onDeleteBtnClick}>
          <Icon theme="filled" type="delete" />
        </button>
      </div>
    );
  }

  render() {
    const { imageUrl } = this.state;
    const { showError, errorMessage } = this.props;

    return (
      <div className={css.uploadInput}>
        <Upload
          listType="picture-card"
          accept='image/jpg, image/jpeg, image/png'
          showUploadList={false}
          beforeUpload={this.beforeFileUpload}
          onChange={this.onFileInputChange}
        >
          {!imageUrl && this.renderUploadButton()}
        </Upload>
        {this.renderPreview()}
        {showError && <div className={css.errorBlock}>{errorMessage}</div>}
      </div>
    )
  }
}
