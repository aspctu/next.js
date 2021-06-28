/*
 * The last effect of Edge middleware is redirects.
 * Redirects update the URL and direct users to a new page.
 */
export default function onEdgeRequest(req, res, next) {
  res.redirect('/new-page')
  next()
}
