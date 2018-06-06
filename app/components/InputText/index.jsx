import React from 'react'
import cx from 'classnames'
import styles from './styles.pcss'
import PropTypes from 'prop-types'

class InputText extends React.Component {

  static get defaultProps() {
    return {
      label: null,
      width: null,
      type: InputText.TYPE_INPUT
    }
  }

  static get propTypes() {
    return {
      label: PropTypes.string,
      width: PropTypes.string,
      type: PropTypes.string,
      name: PropTypes.string.isRequired,
    }
  }

  render() {
    return (
      <div
        className={cx(styles["field-controls"])}
        style={{ width: this.props.width }}
      >
        { this.props.label && <label className={styles.label}>{ this.props.label }</label> }
        <input
          className={cx(styles["input"])}
          type={this.props.type}
          name={this.props.name}
        />
      </div>
    );
  }

  /**
   *
   * @returns {string}
   */
  static get TYPE_INPUT() {
    return 'text'
  }

  /**
   *
   * @returns {string}
   */
  static get TYPE_PASS() {
    return 'password'
  }
}

export default InputText;