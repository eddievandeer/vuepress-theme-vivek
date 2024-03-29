import '@theme/styles/main.scss'
import 'font-awesome/css/font-awesome.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import './styles/code.scss'
import './styles/variable.css'
import postMixin from '@theme/mixins/posts'
import routes from '@theme/routes'
import PageController from './components/PageController'

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
    // ...做一些其他的应用级别的优化
    Vue.mixin(postMixin)
    Vue.use(routes, { router })
    Vue.component(PageController.name, PageController)
}