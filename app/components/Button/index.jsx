import React from 'react'
import cx from 'classnames'
import styles from './styles.pcss'
import PropTypes from 'prop-types'

class Button extends React.Component {

  static get defaultProps() {
    return {
      type: Button.TYPE_DEFAULT
    }
  }

  static get propTypes() {
    return {
      type: PropTypes.number
    }
  }

  render() {
    return (
      <button className={cx(styles.btn, {
        [styles.default]: this.props.type === Button.TYPE_DEFAULT,
        [styles.round]: this.props.type === Button.TYPE_ROUND
      })}>
      </button>
    );
  }

  static get TYPE_DEFAULT() {
    return 0
  }

  static get TYPE_ROUND() {
    return 1
  }
}

export default Button;