import uuid from 'uuid/v4'
import React, {Fragment} from 'react'
import cx from 'classnames'
import styles from './styles.pcss'
import PropTypes from 'prop-types'

class InputRadio extends React.Component {

  static get defaultProps() {
    return {
      label: null,
      items: null,
      inline: true
    }
  }

  static get propTypes() {
    return {
      label: PropTypes.string,
      name: PropTypes.string.isRequired,
      items: PropTypes.array,
      inline: PropTypes.bool,
    }
  }

  renderItems(item, key) {
    const id = uuid()
    return (
      <div key={key} className={cx(styles.item, {
        [styles.inline]: this.props.inline
      })}>
        <input
          className={cx(styles.input)}
          type={'radio'}
          name={this.props.name}
          value={ item.value }
          id={id}
          defaultChecked={item.checked}
        />
        <label htmlFor={id}>
          <span>{ item.label }</span>
        </label>
      </div>
    )
  }

  render() {
    return (
      <div className={cx(styles["field-controls"])}>

        { this.props.label && <label className={styles.label}>{this.props.label}</label> }

        { this.props.items &&
          this.props.items.map((item, key) => this.renderItems(item, key))
        }

        { this.props.error && <div className={styles.error}>{ this.props.error }</div> }
      </div>
    );
  }
}

export default InputRadio;