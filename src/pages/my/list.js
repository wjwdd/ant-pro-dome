import React, { Component } from 'react';
import { connect } from 'dva';
const mapStateToProps = ({ List }) => {
  return {
    type: List.type,
  };
};
@connect(mapStateToProps)
class List extends Component {
  state = {};

  render() {
    const { type, noTitleKey } = this.props;
    return <div>{noTitleKey}</div>;
  }
}
export default List;
