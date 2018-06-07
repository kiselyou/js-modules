import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import jsen from 'jsen'
import objectPath from 'object-path'

const directory = path.resolve(__dirname, './../validation')
const files = fs.readdirSync(directory)

let rules = []
for (const file of files) {
  const rule = yaml.safeLoad(fs.readFileSync(path.join(directory, file), 'utf8'))
  rules.push(rule)
}

/**
 *
 * @param {string} action - Name of action from one of the file in the "api/validation"
 * @param {Object} value - values to validate
 * @returns {Array.<{message: string, path: string, keyword: string}>}
 */
export function validate(action, value) {
  for (const rule of rules) {
    const ruleConfig = objectPath.get(rule, action, null)
    if ( ! ruleConfig) {
      continue
    }

    const validator = jsen(ruleConfig)
    if ( ! validator(value)) {
      return validator.errors
    }
  }

  return []
}