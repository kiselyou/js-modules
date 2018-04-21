import React from 'react'
import styles from './styles.pcss';

class SideBar extends React.Component {

  render () {
    return (
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.corner}/>
          <div className={styles.title}>2</div>
          <div className={styles.figure}/>
        </div>
        <div className={styles.body}>asdasd</div>
      </div>
    )
  }
}

export default SideBar;