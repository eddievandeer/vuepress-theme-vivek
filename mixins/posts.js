import { sortPostsByStickyAndDate } from '../util/postsData'
import { countCategories, countTags } from '../util/helper'

export default {
    computed: {
        $sitePages() {
            return this.$site.pages.filter(page => page.path.endsWith('html'))
        },
        $filteredPages() {
            const { filters } = this.$themeConfig
            let routePath = this.$route.path.split("/")[1]
            
            return this.$sitePages.filter(page => {
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

            this.$sitePages.forEach((page) => {
                countCategories(page, siteCategories)
            })

            return siteCategories
        },
        $tags() {
            const siteTags = new Map()
            
            this.$sitePages.forEach((page) => {
                countTags(page, siteTags)
            })

            return siteTags
        }
    }
}