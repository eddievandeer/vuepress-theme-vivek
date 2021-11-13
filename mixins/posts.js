import { sortPostsByStickyAndDate } from '../util/postsData'
import { countCategories, countTags } from '../util/helper'

export default {
    computed: {
        $filteredPages() {
            const { filters } = this.$themeConfig
            let routePath = this.$route.path.split("/")[1]
            let pages = this.$site.pages.filter(page => page.path.endsWith('html'))
            
            return pages.filter(page => {
                if(filters && filters.length > 0 && routePath == '') {
                    return !filters.includes(page.frontmatter.categories)
                }

                return !page.frontmatter.not
            })
        },
        $sortedPages() {
            let pages = this.$filteredPages

            sortPostsByStickyAndDate(pages)

            return pages
        },
        $listPages() {
            let routePath = this.$route.path.split("/")[1]

            if(routePath == 'page') return this.$sortedPages

            return this.$sortedPages.filter((page) => page.regularPath.split("/")[1] == routePath)
        },
        $categories() {
            const siteCategories = new Map()

            this.$sortedPages.forEach((page) => {
                countCategories(page, siteCategories)
            })

            return siteCategories
        },
        $tags() {
            const siteTags = new Map()
            
            this.$sortedPages.forEach((page) => {
                countTags(page, siteTags)
            })

            return siteTags
        }
    }
}