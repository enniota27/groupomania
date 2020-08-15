export { default as Loading } from '../..\\components\\Loading.vue'
export { default as Logo } from '../..\\components\\Logo.vue'

export const LazyLoading = import('../..\\components\\Loading.vue' /* webpackChunkName: "components_Loading" */).then(c => c.default || c)
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components_Logo" */).then(c => c.default || c)
