'use strict'

import { connect } from 'react-redux/native'
import { bindActionCreators, compose } from 'redux'

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
