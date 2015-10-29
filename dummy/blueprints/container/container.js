'use strict'

import { connect } from 'react-redux/native'
import { bindActionCreators, compose } from 'redux'

import shouldPureComponentUpdate from 'react-pure-render/function'

import <% PATH_TITLE_CASE %>Component from './component'

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, stateProps, {

  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(<% PATH_TITLE_CASE %>Component);
