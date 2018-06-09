import React from 'react'
import cx from 'classnames'
import styles from './styles.pcss'
import PropTypes from 'prop-types'

import BodyWrapper from './../BodyWrapper'

class Informer extends React.Component {

  constructor(props) {
    super(props)
  }

  static get defaultProps() {
    return {
      margin: Informer.MD,
      size: Informer.MD,
      type: null,
      show: false
    }
  }

  static get propTypes() {
    return {
      margin: PropTypes.number,
      type: PropTypes.number,
      size: PropTypes.number,
      items: PropTypes.array,
    }
  }

  renderItem(text, key) {
    return (<li key={key}>{ text }</li>);
  }

  render() {
    return (
      <BodyWrapper margin={this.props.margin}>
        <ul className={cx(styles.informer, {
          [styles.error]: this.props.type === Informer.TYPE_ERROR,
          [styles.success]: this.props.type === Informer.TYPE_SUCCESS,
          [styles.warning]: this.props.type === Informer.TYPE_WARNING,

          [styles.xs]: this.props.size === Informer.XS,
          [styles.sm]: this.props.size === Informer.SM,
          [styles.md]: this.props.size === Informer.MD,
          [styles.lg]: this.props.size === Informer.LG,
        })}>

          {this.props.children && this.renderItem(this.props.children, 0)}
          {this.props.items && this.props.items.map((item, key) => this.renderItem(item, key + 1))}

        </ul>
      </BodyWrapper>
    )
  }

  /**
   *
   * @returns {number}
   */
  static get XS() {
    return BodyWrapper.XS
  }

  /**
   *
   * @returns {number}
   */
  static get SM() {
    return BodyWrapper.SM
  }

  /**
   *
   * @returns {number}
   */
  static get MD() {
    return BodyWrapper.MD
  }

  /**
   *
   * @returns {number}
   */
  static get LG() {
    return BodyWrapper.LG
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_ERROR() {
    return 1
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_SUCCESS() {
    return 2
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_WARNING() {
    return 3
  }
}

export default Informer