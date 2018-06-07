import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import styles from './styles.pcss'
import cx from 'classnames'
import Modal from './Modal'
import Button from './Button'
import InputText from './InputText'
import Ajax from '@helper/ajax/Ajax'
import objectPath from 'object-path'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isUser: false,
      showModalAuth: false,
      showModalReg: false,
      showModalRestore: false,
      errorAuth: null,
      errorReg: null,
      errorRestore: null
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  /**
   *
   * @param {string} value
   * @returns {App}
   */
  errorAuth(value) {
    this.setState({
      errorAuth: value,
    })
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {App}
   */
  errorReg(value) {
    this.setState({
      errorReg: value,
    })
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {App}
   */
  errorRestore(value) {
    this.setState({
      errorRestore: value,
    })
    return this
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
      showModalRestore: false,
    })
    return this
  }

  /**
   *
   * @returns {App}
   */
  closeAuth() {
    this.setState({ showModalAuth: false })
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
      showModalRestore: false,
    })
    return this
  }

  /**
   *
   * @returns {App}
   */
  closeReg() {
    this.setState({ showModalReg: false })
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
    })
    return this
  }

  /**
   *
   * @returns {App}
   */
  closeRestore() {
    this.setState({ showModalRestore: false })
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
        }
        console.log(res, 'authorization')
      })
      .catch((error) => {
        console.log(error, 'authorization')
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
        }
        console.log(res, 'registration')
      })
      .catch((error) => {
        console.log(error, 'registration')
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
        }
      })
      .catch((error) => {
        console.log(error, 'restore')
      })
  }

  render() {
    return (
      <div>

        { ! this.state.isUser && !this.state.showModalAuth &&
          <div className={styles.app}>
            <div className={styles.start}>
              <Button onclick={() => this.openAuth()} height={'40px'} width={'220px'}>
                Sign in to Iron-War
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

          </Modal>
        }

        { this.state.isUser &&
          <Button>Play</Button>
        }

      </div>
    )
  }
}

export default App;