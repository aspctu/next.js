/*
 * One of the effects of the Edge middleware is adding headers to
 * the request. Here, all requests should have a new header 'foo'
 * with value 'bar'.
 */

export function onEdgeRequest(req, res, next) {
  res.setHeader('foo', 'bar')
  next()
}
