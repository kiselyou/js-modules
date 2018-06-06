import React from 'react'
import cx from 'classnames'
import styles from './styles.pcss'
import PropTypes from 'prop-types'

class Button extends React.Component {

  static get defaultProps() {
    return {
      type: Button.TYPE_DEFAULT,
      onclick: null,
      height: null,
      width: null
    }
  }

  static get propTypes() {
    return {
      type: PropTypes.number,
      onclick: PropTypes.func,
      height: PropTypes.string,
      width: PropTypes.string,
    }
  }

  render() {
    return (
      <button
        className={cx(styles.btn, {
          [styles.default]: this.props.type === Button.TYPE_DEFAULT,
          [styles.square]: this.props.type === Button.TYPE_SQUARE,
          [styles.round]: this.props.type === Button.TYPE_ROUND,
          [styles.link]: this.props.type === Button.TYPE_LINK,
        })}
        onClick={this.props.onclick}
        style={{width: this.props.width, height: this.props.height}}
      >
        { this.props.children }
      </button>
    );
  }

  static get TYPE_DEFAULT() {
    return 0
  }

  static get TYPE_ROUND() {
    return 1
  }

  static get TYPE_SQUARE() {
    return 2
  }

  static get TYPE_LINK() {
    return 3
  }
}

export default Button;