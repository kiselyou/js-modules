import React from 'react'
import cx from 'classnames'
import styles from './styles.pcss'
import PropTypes from 'prop-types'

class BodyWrapper extends React.Component {

  constructor(props) {
    super(props)
  }

  static get defaultProps() {
    return {
      margin: null
    }
  }

  static get propTypes() {
    return {
      margin: PropTypes.number
    }
  }

  render() {
    return (
      <div className={cx(styles.wrapper, {
        [styles.xs]: this.props.margin === BodyWrapper.XS,
        [styles.sm]: this.props.margin === BodyWrapper.SM,
        [styles.md]: this.props.margin === BodyWrapper.MD,
        [styles.lg]: this.props.margin === BodyWrapper.LG
      })}>

        { this.props.children && this.props.children}

      </div>
    )
  }

  /**
   *
   * @returns {number}
   */
  static get XS() {
    return 1
  }

  /**
   *
   * @returns {number}
   */
  static get SM() {
    return 2
  }

  /**
   *
   * @returns {number}
   */
  static get MD() {
    return 3
  }

  /**
   *
   * @returns {number}
   */
  static get LG() {
    return 4
  }
}

export default BodyWrapper