import React from 'react';
import styles from './styles.pcss'

class Button extends React.Component {

  render() {
    return (
      <button className={styles.content}>
        <span className={styles.text}>
          {this.props.children}
        </span>
      </button>
    );
  }
}

export default Button;