import React from 'react'
import cx from 'classnames'
import FontAwesome from 'react-fontawesome'
import styles from './styles.pcss'
import PropTypes from 'prop-types'
import Button from '../Button/index'
import Loader from 'react-loader-spinner'
import AsyncLoader from './../AsyncLoader'

class Modal extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      show: true
    }
  }

  static get defaultProps() {
    return {
      title: null,
      foot: null,
      onClose: null,
      process: false,
      processAsync: false,
      useAnimation: true,
    }
  }

  static get propTypes() {
    return {
      title: PropTypes.string,
      foot: PropTypes.element,
      onClose: PropTypes.func,
      process: PropTypes.bool,
      processAsync: PropTypes.bool,
      useAnimation: PropTypes.bool,
    }
  }

  close() {
    this.setState({
      show: false
    })
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    return (
      <div className={cx(styles.modal, { [styles.hidden]: ! this.state.show })}>
        <div className={cx(styles.content, {
          [styles.animation]: this.props.useAnimation
        })}>

          { this.props.processAsync && <AsyncLoader/> }

          <div className={styles.head}>
            <div>{ this.props.title }</div>
            <div>
              <Button
                type={Button.TYPE_LINK}
                onclick={() => this.close()}
              >
                <FontAwesome name='times'/>
              </Button>
            </div>
          </div>

          <div className={styles.body}>
            { this.props.children }
          </div>

          { this.props.foot &&
            <div className={styles.foot}>{ this.props.foot }</div>
          }

          { (this.props.process && !this.props.processAsync) &&
            <div className={styles.cover}>
              <Loader type="Ball-Triangle" color="rgb(205, 205, 205)" height={40} width={40}/>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default Modal;