import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as css from './Responsive.scss';

export default class Responsive extends Component {
  static MOBILE = css.mobile;
  static DESKTOP = css.desktop;
  static defaultProps = {
    query: Responsive.DESKTOP,
    children: null
  };
  static propTypes = {
    query: PropTypes.oneOf([Responsive.MOBILE, Responsive.DESKTOP]),
    children: PropTypes.node
  };
  static isMatching = query => !!window.matchMedia(query).matches;

  constructor(props) {
    super(props);
  
    this.state = {
      isMatching: Responsive.isMatching(props.query)
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

	onWindowResize = () => this.setState({ isMatching: Responsive.isMatching(this.props.query) });

	render() {
    return this.state.isMatching && this.props.children;
  }
};
