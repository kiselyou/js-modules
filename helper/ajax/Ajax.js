import qs from 'qs'

class Ajax {

  /**
   * Send POST data
   *
   * @param {string} url
   * @param {FormData|Object|Array} [param]
   * @returns {Promise}
   */
  static post(url, param = {}) {
    return new Promise((resolve, reject) => {
      Ajax._execute(
        (xhr) => {
          xhr.open('POST', url)
          Ajax._setHeaderHTTP(xhr)
          xhr.send(Ajax._preparePostData(param))
        },
        resolve,
        reject
      )
    })
  }

  /**
   * Send GET data
   *
   * @param {string} url
   * @param {{}|[]} [params]
   * @returns {Promise}
   */
  static get(url, params = null) {
    return new Promise((resolve, reject) => {
      Ajax._execute(
        (xhr) => {
          xhr.open('GET', Ajax._prepareGetURL(url, params))
          Ajax._setHeaderHTTP(xhr)
          xhr.send()
        },
        resolve,
        reject
      )
    })
  }

  /**
   * Control params
   *
   * @param {FormData|{}|Array} param
   * @returns {FormData}
   * @private
   */
  static _preparePostData(param) {
    if (!(param instanceof FormData)) {
      const formData = new FormData()
      for (let key in param) {
        if (param.hasOwnProperty(key)) {
          if (typeof param[key] === 'object') {
            formData.append(key, qs.stringify(param[key], {encode: false}))
          } else {
            formData.append(key, param[key])
          }
        }
      }
      return formData
    }
    return param
  }

  /**
   * Prepare url to send on server
   *
   * @param {string} url
   * @param {({}|[])} [params]
   * @returns {string}
   * @static
   * @private
   */
  static _prepareGetURL(url, params = null) {
    return url + (params ? qs.stringify(params, {addQueryPrefix: (url.indexOf('?') === -1)}) : '')
  }

  /**
   * Set HTTP Headers
   *
   * @param {XMLHttpRequest} xhr
   * @returns {Ajax}
   * @private
   */
  static _setHeaderHTTP(xhr) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  }

  /**
   * @param {XMLHttpRequest} xhr
   * @callback HttpRequestMethod
   */

  /**
   * @param {number} status
   * @param {string} statusText
   * @callback HttpResponseError
   */

  /**
   * @param {string} responseText
   * @callback HttpResponseSuccess
   */

  /**
   * Execute sending data to server
   *
   * @param {HttpRequestMethod} method
   * @param {HttpResponseSuccess} onSuccess
   * @param {HttpResponseError} [onError]
   * @returns {void}
   * @private
   */
  static _execute(method, onSuccess, onError = null) {
    let xhr = new XMLHttpRequest()
    method(xhr)
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return
      }

      if (xhr.status !== 200) {
        if (onError) {
          onError(xhr.status, xhr.statusText)
        }
      } else {
        onSuccess(xhr.responseText)
      }
    }
  }
}

export default Ajax