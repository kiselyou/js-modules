import React from 'react'
import PropTypes from 'prop-types'

import Modal from './Modal'
import Button from './Button'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isUser: false
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
    //   isUser: ! this.state.isUser
    // });
  }

  render() {

    return (
      <div>

        { ! this.state.isUser &&
          <Modal>
            qweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qwqweqweqw eqweqweqw eqweq qw
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