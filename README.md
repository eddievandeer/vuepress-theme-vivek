## 介绍
这是一款简约风格的vuepress主题，可通过 `docs/.vuepress/config.js` 文件进行多种（在原版的基础上新增的）自定义属性的配置
目前能进行自定义的部分还比较有限，将在后续的开发中更新新的自定义功能，目标是打造一个高度自定义化的主题，能够让用户自行组合出属于自己的独一无二的博客网站

## 快速开始
### 安装
```
npm i vuepress-theme-vivek -D
```

### 使用
在 `docs/.vuepress/config.js` 文件中输入如下配置

```js
module.exports = {
  theme: 'vuepress-theme-vivek',
  themeConfig: {
    // Please head documentation to see the available options.
  }
}
// or
module.exports = {
  theme: 'vivek',
  themeConfig: {
    // Please head documentation to see the available options.
  }
}
```