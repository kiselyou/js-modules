import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import styles from './styles.pcss'
import Modal from './Modal'
import Button from './Button'
import InputText from './InputText'
import Ajax from '@helper/ajax/Ajax'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isUser: false,
      showModalAuth: false,
      showModalReg: false
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  openAuth() {
    this.setState({ showModalAuth: true })
    return this
  }

  closeAuth() {
    this.setState({ showModalAuth: false })
    return this
  }

  openReg() {
    this.setState({ showModalReg: true })
    return this
  }

  closeReg() {
    this.setState({ showModalReg: false })
    return this
  }

  /**
   *
   */
  authorization() {
    const form = document.getElementById('form-authorization')
    const formData = new FormData(form)
    Ajax.post('/user/authorization', formData)
      .then((res) => {
        console.log(res, 'authorization')
      })
      .catch((error) => {
        console.log(error, 'authorization')
      })
  }

  /**
   *
   *
   */
  registration() {
    const form = document.getElementById('form-registration')
    const formData = new FormData(form)
    Ajax.post('/user/registration', formData)
      .then((res) => {
        console.log(res, 'registration')
      })
      .catch((error) => {
        console.log(error, 'registration')
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
                <div>
                  <Button onclick={() => this.closeAuth().openReg()} type={Button.TYPE_LINK}>
                    Create an account.
                  </Button>
                </div>
                <div>
                  <Button onclick={() => this.authorization()}>Sign in</Button>
                </div>
              </div>
            }
          >
            <form id={'form-authorization'}>
              <InputText name={'email'} label={'Email address'}/>
              <InputText name={'password'} label={'Password'} type={InputText.TYPE_PASS}/>
            </form>
          </Modal>
        }

        { this.state.showModalReg &&
          <Modal
            title={'Create your personal account.'}
            onClose={() => this.closeReg()}
            foot={
              <div className={styles.inline}>
                <div>
                  <Button onclick={() => this.closeReg().openAuth()} type={Button.TYPE_LINK}>
                    Sign in
                  </Button>
                </div>
                <div>
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