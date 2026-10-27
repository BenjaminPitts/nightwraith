export default {
  prerender: true,
  clientRouting: false,
  trailingSlash: true,
  meta: {
    Head: { env: { server: true, client: true } },
  },
}
