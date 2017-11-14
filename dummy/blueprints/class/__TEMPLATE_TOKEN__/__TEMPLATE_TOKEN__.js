import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './<% TEMPLATE_TOKEN pascalCase %>.sass'

class <% TEMPLATE_TOKEN pascalCase %> extends Component {
  static defaultProps = {
  }
  static displayName = '<% TEMPLATE_TOKEN pascalCase %>'
  static propTypes = {
    /** Prop description */
    propname: PropTypes.string
  }
  render = () => {
    return (
      <div></div>
    )
  }
}

export default <% TEMPLATE_TOKEN pascalCase %>
