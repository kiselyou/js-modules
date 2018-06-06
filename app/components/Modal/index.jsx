import React from 'react'
import cx from 'classnames'
import FontAwesome from 'react-fontawesome'
import styles from './styles.pcss'
import PropTypes from 'prop-types'
import Button from './../Button'

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
      useAnimation: true
    }
  }

  static get propTypes() {
    return {
      title: PropTypes.string,
      foot: PropTypes.element,
      onClose: PropTypes.func,
      useAnimation: PropTypes.bool
    }
  }

  componentDidMount() {
    // this.timerID = setInterval(() => this.tick(), 3000)
  }

  componentWillUnmount() {
    // clearInterval(this.timerID)
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
          [styles.animation]: this.state.useAnimation
        })}>
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
        </div>
      </div>
    );
  }
}

export default Modal;