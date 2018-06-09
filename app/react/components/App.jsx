import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUser } from '../actions/authAction'

import User from '@entity/User'

import FontAwesome from 'react-fontawesome'
import styles from './styles.pcss'
import cx from 'classnames'
import Modal from './Modal/index'
import Button from './Button/index'
import InputText from './InputText/index'
import Ajax from '@helper/ajax/Ajax'
import objectPath from 'object-path'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showBtnPlay: true,
      showBtnSignIn: true,
      showModalAuth: false,
      showModalReg: false,
      showModalRestore: false,
      errorAuth: null,
      errorReg: null,
      errorRestore: null,
      successAuth: null,
      successReg: null,
      successRestore: null,
    }
  }

  static get propTypes() {
    return {
      user: PropTypes.instanceOf(User),
      setUser: PropTypes.func,
      onPlay: PropTypes.func.isRequired,
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  /**
   *
   * @returns {App}
   */
  clearError() {
    this.setState({
      errorAuth: null,
      errorReg: null,
      errorRestore: null,
      successAuth: null,
      successReg: null,
      successRestore: null,
    })
    return this
  }

  /**
   *
   * @returns {App}
   */
  openAuth() {
    this.setState({
      showModalAuth: true,
      showModalReg: false,
      showBtnSignIn: false,
      showModalRestore: false,
    })
    return this
  }

  /**
   *
   * @returns {App}
   */
  closeAuth() {
    this.setState({ showModalAuth: false, showBtnSignIn: true })
    return this
  }

  /**
   *
   * @returns {App}
   */
  openReg() {
    this.setState({
      showModalReg: true,
      showModalAuth: false,
      showBtnSignIn: false,
      showModalRestore: false,
    })
    return this
  }

  /**
   *
   * @returns {App}
   */
  closeReg() {
    this.setState({ showModalReg: false, showBtnSignIn: true })
    return this
  }

  /**
   *
   * @returns {App}
   */
  openRestore() {
    this.setState({
      showModalRestore: true,
      showModalAuth: false,
      showModalReg: false,
      showBtnSignIn: false,
    })
    return this
  }

  /**
   *
   * @returns {App}
   */
  closeRestore() {
    this.setState({ showModalRestore: false, showBtnSignIn: true })
    return this
  }

  /**
   *
   * @returns {void}
   */
  authorization() {
    this.clearError()
    const form = document.getElementById('form-authorization')
    const formData = new FormData(form)
    Ajax.post('/user/authorization', formData)
      .then((res) => {
        const data = JSON.parse(res)
        const msg = objectPath.get(data, 'msg', null)
        const status = objectPath.get(data, 'status', null)
        if (status === 0) {
          this.setState({ errorAuth: msg })
          return
        }
        if (status === 1) {
          const userData = objectPath.get(data, 'user', null)
          this.props.setUser(userData)
          this.setState({ successAuth: msg, showModalAuth: false })
        }
      })
  }

  /**
   *
   * @returns {void}
   */
  registration() {
    this.clearError()
    const form = document.getElementById('form-registration')
    const formData = new FormData(form)
    Ajax.post('/user/registration', formData)
      .then((res) => {
        const data = JSON.parse(res)
        const msg = objectPath.get(data, 'msg', null)
        const status = objectPath.get(data, 'status', null)
        if (status === 0) {
          this.setState({ errorReg: msg })
          return
        }
        if (status === 1) {
          this.setState({ successReg: msg })
        }
      })
  }

  /**
   *
   * @returns {void}
   */
  restore() {
    this.clearError()
    const form = document.getElementById('form-restore')
    const formData = new FormData(form)
    Ajax.post('/user/restore', formData)
      .then((res) => {
        const data = JSON.parse(res)
        const msg = objectPath.get(data, 'msg', null)
        const status = objectPath.get(data, 'status', null)
        if (status === 0) {
          this.setState({ errorRestore: msg })
          return
        }

        if (status === 1) {
          this.setState({ successRestore: msg })
        }
      })
  }

  render() {
    return (
      <div>

        { ! this.props.user.isAuthorized && this.state.showBtnSignIn &&
          <div className={styles.app}>
            <div className={styles.start}>
              <Button onclick={() => this.openAuth()} height={'40px'} width={'220px'}>
                Sign in to Iron-War
              </Button>
            </div>
          </div>
        }

        { this.props.user.isAuthorized && this.state.showBtnPlay &&
          <div className={styles.app}>
            <div className={styles.start}>
              <Button onclick={() => {
                this.setState({ showBtnPlay: false })
                this.props.onPlay(this.props.user)
              }} height={'40px'} width={'220px'}>
                Play
              </Button>
            </div>
          </div>
        }

        { this.state.showModalAuth &&
          <Modal
            title={'Sign in to Iron-War'}
            onClose={() => this.closeAuth()}
            foot={
              <div className={styles.inline}>
                <div className={cx(styles.inline, {[styles.left]: true})}>
                  <Button onclick={() => this.openReg()} type={Button.TYPE_LINK} size={Button.SIZE_SM}>
                    Create an account.
                  </Button>
                  <Button onclick={() => this.openRestore()} type={Button.TYPE_LINK} size={Button.SIZE_SM}>
                    Restore an account.
                  </Button>
                </div>
                <div className={cx(styles.inline, {[styles.right]: true})}>
                  <Button onclick={() => this.authorization()}>Sign in</Button>
                </div>
              </div>
            }
          >

            <form id={'form-authorization'}>
              <InputText name={'email'} label={'Email address'}/>
              <InputText name={'password'} label={'Password'} type={InputText.TYPE_PASS}/>
            </form>

            { this.state.errorAuth && <div className={styles.error}>{ this.state.errorAuth }</div> }
            { this.state.successAuth && <div className={styles.success}>{ this.state.successAuth }</div> }

          </Modal>
        }

        { this.state.showModalReg &&
          <Modal
            title={'Create your personal account.'}
            onClose={() => this.closeReg()}
            foot={
              <div className={styles.inline}>
                <div className={cx(styles.inline, {[styles.left]: true})}>
                  <Button onclick={() => this.openAuth()} type={Button.TYPE_LINK} size={Button.SIZE_SM}>
                    Sign in
                  </Button>
                </div>
                <div className={cx(styles.inline, {[styles.right]: true})}>
                  <Button onclick={() => this.registration()}>
                    Create an account.
                  </Button>
                </div>
              </div>
            }
          >

            <form id={'form-registration'}>
              <InputText name={'email'} label={'Email address'}/>
            </form>

            { this.state.errorReg && <div className={styles.error}>{ this.state.errorReg }</div> }
            { this.state.successReg && <div className={styles.success}>{ this.state.successReg }</div> }

          </Modal>
        }

        { this.state.showModalRestore &&
          <Modal
            title={'Restore account.'}
            onClose={() => this.closeRestore()}
            foot={
              <div className={styles.inline}>
                <div className={cx(styles.inline, {[styles.left]: true})}>
                  <Button onclick={() => this.openAuth()} type={Button.TYPE_LINK} size={Button.SIZE_SM}>
                    Sign in
                  </Button>
                </div>
                <div className={cx(styles.inline, {[styles.right]: true})}>
                  <Button onclick={() => this.restore()}>
                    Restore an account.
                  </Button>
                </div>
              </div>
            }
          >

            <form id={'form-restore'}>
              <InputText name={'email'} label={'Email address'}/>
            </form>

            { this.state.errorRestore && <div className={styles.error}>{ this.state.errorRestore }</div> }
            { this.state.successRestore && <div className={styles.success}>{ this.state.successRestore }</div> }

          </Modal>
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: bindActionCreators(setUser, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)