export default defineEventHandler((event) => {
  console.log('event', event.path)

  if (event.path.includes('/blog')) {
    return
  }

  event.context.nuxt = event.context.nuxt || {}
  event.context.nuxt.noSSR = true
})
