import React from 'react'
import cx from 'classnames'
import styles from './styles.pcss'
import PropTypes from 'prop-types'
import BodyWrapper from './../BodyWrapper'

class AsyncLoader extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      status: 0
    }
  }

  static get defaultProps() {
    return {
      size: null,
      label: null
    }
  }

  static get propTypes() {
    return {
      size: PropTypes.number,
      label: PropTypes.string,
    }
  }

  render() {
    return (
      <div className={styles.progress}>
        <div className={cx(styles.indicator, {
          [styles.xs]: this.props.size === AsyncLoader.SIZE_XS,
          [styles.sm]: this.props.size === AsyncLoader.SIZE_SM,
          [styles.md]: this.props.size === AsyncLoader.SIZE_MD,
          [styles.lg]: this.props.size === AsyncLoader.SIZE_LG,
        })}>
          <div className={styles.wave}/>
          <div className={styles.wave}/>
          <div className={styles.wave}/>
          <div className={styles.wave}/>
          <div className={styles.wave}/>
        </div>

        { this.props.label &&
          <BodyWrapper margin={BodyWrapper.MD}>
            <div className={styles.status}>
              { this.props.label }
              <span> { this.state.status }%</span>
            </div>
          </BodyWrapper>
        }
      </div>
    )
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
}

export default AsyncLoader