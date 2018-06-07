import React from 'react'
import cx from 'classnames'
import styles from './styles.pcss'
import PropTypes from 'prop-types'

class Button extends React.Component {

  static get defaultProps() {
    return {
      type: Button.TYPE_DEFAULT,
      size: Button.SIZE_MD,
      onclick: null,
      height: null,
      width: null,
    }
  }

  static get propTypes() {
    return {
      type: PropTypes.number,
      size: PropTypes.number,
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
          [styles.xxs]: this.props.size === Button.SIZE_XXS,
          [styles.xs]: this.props.size === Button.SIZE_XS,
          [styles.sm]: this.props.size === Button.SIZE_SM,
          [styles.md]: this.props.size === Button.SIZE_MD,
          [styles.lg]: this.props.size === Button.SIZE_LG,
          [styles.xlg]: this.props.size === Button.SIZE_XLG,
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

  static get SIZE_XXS() {
    return 0
  }

  static get SIZE_XS() {
    return 1
  }

  static get SIZE_SM() {
    return 2
  }

  static get SIZE_MD() {
    return 3
  }

  static get SIZE_LG() {
    return 4
  }

  static get SIZE_XLG() {
    return 5
  }
}

export default Button;