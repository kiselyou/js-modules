import React from 'react'
import cx from 'classnames'
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

  static get propTypes() {
    return {
      title: PropTypes.string
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // this.setState({
    //   show: ! this.state.show
    // });
  }

  render() {
    return (
      <div className={cx(styles.modal, {[styles.hide]: ! this.state.show})}>
        <div className={cx(styles.content, {
          [styles.animation]: this.state.show
        })}>
          <div className={styles.head}>
            <div>{this.props.title} asdasdasd</div>
            <div>
              <Button type={Button.TYPE_ROUND}/>
              <Button type={Button.TYPE_ROUND}/>
              <Button type={Button.TYPE_ROUND}/>
            </div>
          </div>
          <div className={styles.body}>
            { this.props.children }
            </div>
          <div className={styles.foot}>asdasd</div>
        </div>
      </div>
    );
  }
}

export default Modal;