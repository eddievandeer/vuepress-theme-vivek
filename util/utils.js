export function parseTitle(navConfig) {
    let result = []
    for (let i = 0; i < navConfig.length; i++) {
        let item = navConfig[i]
        result.push({
            level: 2,
            url: item.link ? item.link : 'javascript:;',
            title: item.text
        })
        if (item.items) {
            for (let j = 0; j < item.items.length; j++) {
                result.push({
                    level: 3,
                    url: item.items[j].link ? item.items[j].link : 'javascript:;',
                    title: item.items[j].text
                })
            }
        }
    }
    return result
}

export function visibilityChange(document) {
    let visibilityChange
    if (typeof document.hidden !== 'undefined') {
        visibilityChange = 'visibilitychange'
    }
    else if (typeof document.mozHidden !== 'undefined') {
        visibilityChange = 'mozvisibilitychange'
    }
    else if (typeof document.msHidden !== 'undefined') {
        visibilityChange = 'msvisibilitychange'
    }
    else if (typeof document.webkitHidden !== 'undefined') {
        visibilityChange = 'webkitvisibilitychange'
    }
    return visibilityChange
}

export function parsePage(pages, now) {
    const result = []
    pages.forEach(page => {
        if (page.path.split('/')[1] == now.split('/')[1]) {
            result.push(page.path)
        }
    });
    return result
}

export function compareDate(a, b) {
    return (new Date(b.frontmatter.postTime) - new Date(a.frontmatter.postTime))
}

//判断是否是pc端 true为pc端 false为移动端
export function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}