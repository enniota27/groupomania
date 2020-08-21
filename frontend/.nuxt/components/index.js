export { default as Loading } from '../..\\components\\Loading.vue'
export { default as Message } from '../..\\components\\Message.vue'

export const LazyLoading = import('../..\\components\\Loading.vue' /* webpackChunkName: "components_Loading" */).then(c => c.default || c)
export const LazyMessage = import('../..\\components\\Message.vue' /* webpackChunkName: "components_Message" */).then(c => c.default || c)
