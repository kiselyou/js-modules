
/**
 *
 * @param {object} res
 * @param {{}|[]} data
 */
export function responseJSON(res, data) {
  const str = JSON.stringify(data)
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(str, 'utf-8')
  })
  res.end(str, 'utf-8', true)
}