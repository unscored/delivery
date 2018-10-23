import React, { Component } from 'react';

class WithScrollTop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { component: CompositeComponent, ...rest } = this.props;

    return (
      <CompositeComponent {...rest} />
    );
  }
}

export default component => props => <WithScrollTop {...props} component={component} />;


