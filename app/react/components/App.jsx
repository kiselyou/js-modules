import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUser } from '../actions/authAction'

import User from '@entity/User'

import FontAwesome from 'react-fontawesome'
import styles from './styles.pcss'
import cx from 'classnames'
import Modal from './Modal'
import Button from './Button'
import Inline from './Inline'
import BodyWrapper from './BodyWrapper'
import Informer from './Informer'
import InputText from './InputText'
import InputRadio from './InputRadio'
import Ajax from '@helper/ajax/Ajax'
import objectPath from 'object-path'
import AsyncLoader from "@app/react/components/AsyncLoader";

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
      process: false,
      processLoad: false
    }
  }

  static get defaultProps() {
    return {
      timeout: 500,
    }
  }

  /**
   * @param {User} user
   * @param {Function} stopLoader
   * @callback startPlayCallback
   */

  /**
   *
   * @returns {{user: *, onPlay: startPlayCallback, setUser: *, timeout: shim}}
   */
  static get propTypes() {
    return {
      user: PropTypes.instanceOf(User).isRequired,
      onPlay: PropTypes.func.isRequired,
      setUser: PropTypes.func.isRequired,
      timeout: PropTypes.number
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
   * @returns {App}
   */
  startProcess() {
    this.setState({ process: true })
    return this
  }

  /**
   *
   * @returns {App}
   */
  stopProcess() {
    setTimeout(() => this.setState({ process: false }), this.props.timeout)
    return this
  }

  /**
   *
   * @returns {void}
   */
  authorization() {
    this
      .startProcess()
      .clearError()
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
          setTimeout(
            () => this.setState({ successAuth: msg, showModalAuth: false }),
            this.props.timeout
          )
        }
      })
      .finally(() => this.stopProcess())
  }

  /**
   *
   * @returns {void}
   */
  registration() {
    this
      .startProcess()
      .clearError()

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
      .finally(() => this.stopProcess())
  }

  /**
   *
   * @returns {void}
   */
  restore() {
    this
      .startProcess()
      .clearError()

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
      .finally(() => this.stopProcess())
  }

  render() {

    const models = this.props.defaultModels.map((item, i) => {
      return {
        value: item.id,
        label: item.name,
        checked: i === 0
      }
    })

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

        { this.state.processLoad && <AsyncLoader size={AsyncLoader.SIZE_SM}/> }

        { this.props.user.isAuthorized && this.state.showBtnPlay &&
          <div className={styles.app}>
            <div className={styles.start}>

              <Button onclick={() => {
                this.setState({ showBtnPlay: false, processLoad: true })
                this.props.onPlay(this.props.user, () => {
                  this.setState({ processLoad: false })
                })
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
            process={this.state.process}
            foot={
              <Inline
                left={
                  <Fragment>
                    <Button
                      onclick={() => this.openReg()}
                      type={Button.TYPE_LINK}
                      size={Button.SIZE_SM}
                      skin={Button.SKIN_GRAY}
                    >
                      Create an account.
                    </Button>
                    <Button
                      onclick={() => this.openRestore()}
                      type={Button.TYPE_LINK}
                      size={Button.SIZE_SM}
                      skin={Button.SKIN_GRAY}
                    >
                      Restore an account.
                    </Button>
                  </Fragment>
                }
                right={<Button onclick={() => this.authorization()}>Sign in</Button>}
              />
            }
          >

            <BodyWrapper margin={BodyWrapper.MD}>
              <form id={'form-authorization'}>
                <InputText name={'email'} label={'Email address'}/>
                <InputText name={'password'} label={'Password'} type={InputText.TYPE_PASS}/>
              </form>
            </BodyWrapper>

            { this.state.errorAuth &&
              <Informer type={Informer.TYPE_WARNING}>{ this.state.errorAuth }</Informer>
            }

            { this.state.successAuth &&
              <Informer type={Informer.TYPE_SUCCESS}>{ this.state.successAuth }</Informer>
            }

          </Modal>
        }

        { this.state.showModalReg &&
          <Modal
            title={'Create your personal account.'}
            onClose={() => this.closeReg()}
            process={this.state.process}
            foot={
              <Inline
                left={
                  <Button
                    onclick={() => this.openAuth()}
                    type={Button.TYPE_LINK}
                    size={Button.SIZE_SM}
                    skin={Button.SKIN_GRAY}
                  >
                    Sign in
                  </Button>
                }
                right={
                  <Button onclick={() => this.registration()}>
                    Create an account.
                  </Button>
                }
              />
            }
          >

            <BodyWrapper margin={BodyWrapper.MD}>
              <form id={'form-registration'}>
                <BodyWrapper margin={BodyWrapper.SM}>
                  <InputText name={'email'} label={'Email address'}/>
                </BodyWrapper>

                <BodyWrapper margin={BodyWrapper.SM}>
                  <InputRadio
                    name={'spaceshipId'}
                    label={'Select base ship'}
                    items={models}/>
                </BodyWrapper>
              </form>
            </BodyWrapper>

            { this.state.errorReg &&
              <Informer type={Informer.TYPE_WARNING}>{ this.state.errorReg }</Informer>
            }

            { this.state.successReg &&
              <Informer type={Informer.TYPE_SUCCESS}>{ this.state.successReg }</Informer>
            }

          </Modal>
        }

        { this.state.showModalRestore &&
          <Modal
            title={'Restore account.'}
            onClose={() => this.closeRestore()}
            process={this.state.process}
            foot={
              <Inline
                left={
                  <Button
                    onclick={() => this.openAuth()}
                    type={Button.TYPE_LINK}
                    size={Button.SIZE_SM}
                    skin={Button.SKIN_GRAY}
                  >
                    Sign in
                  </Button>
                }
                right={
                  <Button onclick={() => this.restore()}>
                    Restore an account.
                  </Button>
                }
              />
            }
          >

            <BodyWrapper margin={BodyWrapper.MD}>
              <form id={'form-restore'}>
                <InputText name={'email'} label={'Email address'}/>
              </form>
            </BodyWrapper>

            { this.state.errorRestore &&
              <Informer type={Informer.TYPE_WARNING}>{ this.state.errorRestore }</Informer>
            }

            { this.state.successRestore &&
              <Informer type={Informer.TYPE_SUCCESS}>{ this.state.successRestore }</Informer>
            }

          </Modal>
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    defaultModels: state.defaultModels
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: bindActionCreators(setUser, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)