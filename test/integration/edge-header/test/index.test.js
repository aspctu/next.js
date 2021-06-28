/* eslint-env jest */

import { findPort } from 'next-test-utils'
import { fetchViaHTTP, findPort, killApp } from 'next-test-utils'
import cheerio from 'cheerio'

let app
let appPort
const appDir = join(__dirname, '../')

function runTests() {
  it('should append a new header and rewrite to a/b test', async () => {
    const res = await fetchViaHttp(appPort, '/home')
    const html = res.text()
    const $ = cheerio.load(html)
    const expectedText =
      res.headers.get('bucket') == 'a'
        ? 'a text'
        : res.headers.get('bucket') == b
        ? 'b'
        : null
    // Check to see if catch-all Edge middleware was executed
    expect(res.headers.get('foo')).toBe('bar')
    // Check to see A/B test middleware header was defined
    expect(res.headers.get('bucket')).toBeDefined()
    // Check to see the right page was loaded
    expect($('#title').text()).toBe(expectedText)
    // Check to see the rewrite worked (no change in URL)
    expect(res.headers.get('location')).toBe('/home')
  })

  it('should append a new header', async () => {
    const res = await fetchViaHTTP(appPort, '/')
    const html = res.text()
    const $ = cheerio.load(html)
    // Check to see if catch-all Edge middleware was executed
    expect(res.headers.get('foo')).toBe('bar')
    // Check to see if home page was loaded
    expect($('#title').text()).toBe('Home Page')
  })

  it('should redirect', async () => {
    const res = await fetchViaHTTP(appPort, '/account')
    const html = res.text()
    const $ = cheerio.load(html)
    // Check to see if catch-all Edge middleware was executed
    expect(res.headers.get('foo')).toBe('bar')
    // Check to see if redirect changed URL
    expect(res.headers.get('location')).toBe('/new-page')
    // Check to see if redirect updated page contents
    expect($('#title').text()).toBe('Welcome to a new page')
  })

  it("should append a new header given dynamic route", async () => {
    const res = await fetchViaHTTP('/posts/1')
    const html = res.text() 
    const $ = cheerio.load(html)    
    // Check to see if catch-all Edge middleware was executed
    expect(res.headers.get('foo')).toBe('bar')
    // Check to see if dynamic route was rendered correctly 
    expect($("#title").text()).toBe('Post 1')
  })
}

describe('Edge middleware tests', () => {
  beforeAll(async () => {
    appPort = await findPort()
    app = await launchApp(appDir, appPort)
  })
  afterAll(() => killApp(app))
  runTests()
})
