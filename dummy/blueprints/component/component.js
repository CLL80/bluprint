'use strict'

import {
  Component,
  PropTypes,
  View,
} from 'react-native'

import shouldPureComponentUpdate from 'react-pure-render/function'

export default class <% PATH_TITLE_CASE %> extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <View>
      </View>
    );
  }
}

<% PATH_TITLE_CASE %>.propTypes = {

};