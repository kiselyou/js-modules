import React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import styles from './styles.pcss'
import Modal from './Modal'
import Button from './Button'

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

  toggleModalAuth() {
    this.setState({
      showModalAuth: ! this.state.showModalAuth,
      // showModalReg: this.state.showModalAuth ? false : this.state.showModalReg
    })
  }

  toggleModalReg() {
    this.setState({
      showModalReg: ! this.state.showModalReg,
      // showModalAuth: this.state.showModalReg ? false : this.state.showModalAuth,
    })
  }

  render() {

    return (
      <div>

        { ! this.state.isUser && !this.state.showModalAuth &&
          <div className={styles.app}>
            <div className={styles.start}>
              <Button onclick={() => this.toggleModalAuth()} height={'40px'} width={'120px'}>
                Войти
              </Button>
            </div>
          </div>
        }

        { this.state.showModalAuth &&
          <Modal
            title={'Login'}
            onClose={() => this.toggleModalAuth()}
            foot={
              <div className={styles.inline}>
                <Button onclick={() => this.toggleModalReg()}>
                  Registration
                </Button>
                <Button onclick={() => this.toggleModalReg()}>
                  Login
                </Button>
              </div>
            }
          >
            qweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq
            qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq
          </Modal>
        }

        { this.state.showModalReg &&
          <Modal
            title={'Registration'}
            onClose={() => this.toggleModalReg()}
            foot={
              <div className={styles.inline}>
                <Button onclick={() => this.toggleModalReg()}>
                  Registration
                </Button>
                <Button onclick={() => this.toggleModalReg()}>
                  Login
                </Button>
              </div>
            }
          >
            qweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq
            qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq
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