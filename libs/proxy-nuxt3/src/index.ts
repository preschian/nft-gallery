import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

// already define routes in wrangler.toml,
// define routes in here is just for the guarding
// to make sure only this routes are allowed to be proxied
app.get('/:prefix/u/:address', (c) => {
  const prefix = c.req.param('prefix')
  const address = c.req.param('address')

  return fetch(`https://marketplace-nuxt3.pages.dev/${prefix}/u/${address}`)
})

app.get('/blog/*', (c) => {
  // get url pathname
  const pathname = new URL(c.req.url).pathname

  return fetch(`https://marketplace-nuxt3.pages.dev${pathname}`)
})

export default app
