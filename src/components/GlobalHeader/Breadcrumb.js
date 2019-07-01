import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
class BreadcrumbHeader extends Component {
  state = {};

  render() {
    return (
      <div>
        <Breadcrumb routes={routes}></Breadcrumb>
      </div>
    );
  }
}

export default BreadcrumbHeader;
