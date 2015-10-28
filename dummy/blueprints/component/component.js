'use strict'

import {
  Component,
  PropTypes,
  View,
} from 'react-native'

import shouldPureComponentUpdate from 'react-pure-render/function'

export default class AddNewButton extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <View>
      </View>
    );
  }
}

AddNewButton.propTypes = {

};