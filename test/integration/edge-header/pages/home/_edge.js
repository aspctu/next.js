/*
 * Another effect of the Edge middleware is rewriting pages.
 * A rewrite is different than a redirect in the sense that the
 * content of the page changes but the url does not.
 */

export function onEdgeRequest(req, res, next) {
  if (req.pathname === '/home') {
    let bucket = req.cookies.bucket
    // Technically, this should never fire in tests as we should always pass a bucket cookie.
    if (!bucket) {
      bucket = Math.random() >= 0.5 ? 'a' : 'b'
      res.cookie('bucket', bucket)
    }
    res.rewrite(`/${bucket}`)
    next()
  }
  next()
}
