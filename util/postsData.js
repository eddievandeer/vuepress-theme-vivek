import { compareDate } from "./utils"

export function sortPostsByDate(posts) {
    return posts.sort((pre, next) => {
        return compareDate(pre, next)
    })
}

export function sortPostsByStickyAndDate(posts) {
    return posts.sort((pre, next) => {
        const preSticky = pre.frontmatter.sticky,
              nextSticky = next.frontmatter.sticky

        if(preSticky && nextSticky) {
            return compareDate(pre, next)
        } else if(preSticky && !nextSticky) {
            return -1
        } else if(!preSticky && nextSticky) {
            return 1
        }
        return compareDate(pre, next)
    })
}