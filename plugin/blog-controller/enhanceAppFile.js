import BlogController from './BlogController.vue'

export default ({ Vue }) => {
  // eslint-disable-next-line vue/match-component-file-name
  Vue.component('BlogController', BlogController)
  Vue.prototype.$eventBus = new Vue();
}