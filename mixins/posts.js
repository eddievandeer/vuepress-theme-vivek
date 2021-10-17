import { sortPostsByStickyAndDate } from '../util/postsData'
import {countCategories, countTags} from '../util/helper'

export default {
    computed: {
        $sortedPages() {
            let pages = this.$site.pages

            pages = pages.filter(page => page.path.endsWith('html'))
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