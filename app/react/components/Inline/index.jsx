import React from 'react'
import cx from 'classnames'
import styles from './styles.pcss'
import PropTypes from 'prop-types'

class Inline extends React.Component {

  constructor(props) {
    super(props)
  }

  static get defaultProps() {
    return {
      left: null,
      right: null,
    }
  }

  static get propTypes() {
    return {
      left: PropTypes.object,
      right: PropTypes.object,
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className={styles.inline}>

        { this.props.left &&
          <div className={cx(styles.inline, {[styles.left]: true})}>{ this.props.left }</div>
        }

        { this.props.children &&
          <div className={cx(styles.inline, {[styles.center]: true})}>{ this.props.children }</div>
        }

        { this.props.right &&
          <div className={cx(styles.inline, {[styles.right]: true})}>{ this.props.right }</div>
        }

      </div>
    )
  }
}

export default Inline