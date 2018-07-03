
class NodeProcess {
  /**
   *
   * @param {string} argument
   * @return {string}
   */
  static runScriptArgument(argument) {
    for (const key of process.argv) {
      if (key === argument) {
        const nextKey = process.argv.indexOf(key) + 1
        return process.argv[nextKey] || null
      }
    }
  }
}

export default NodeProcess