'use strict'

import {
  Component,
  PropTypes,
  View,
} from 'react-native'

export default class <% TEMPLATE_TOKEN pascalCase %> extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <View>
      </View>
    );
  }
}

<% TEMPLATE_TOKEN pascalCase %>.propTypes = {

};