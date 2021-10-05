import Layout from '@theme/layouts/Layout.vue'

const install = (Vue, { router }) => {
    const ru = [
        '/categories/:category', 
        '/categories/:category/page/:pageNumber', 
        '/categories/:category/:child',
        '/categories/:category/:child/page/:pageNumber',
        '/tags/:tag',
        '/tags/:tag/page/:pageNumber',
        '/page/:pageNumber',
        '/*/page/:pageNumber',
    ]

    const routes = ru.map(item => {
        return {
            path: item,
            component: Layout,
            props: true
        }
    })

    router.addRoutes(routes);
}

export default {
    install
}