<template>
  <ul class="post-copyright">
    <li class="post-copyright-author">
      <b>本文作者：</b>
      {{$page.frontmatter.author || $themeConfig.author || '匿名'}}
    </li>
    <li class="post-copyright-link">
      <b>本文链接：</b>
      <a :href="copyrightLink">{{copyrightLink}}</a>
    </li>
    <li class="post-copyright-license">
      <b>版权声明：</b>
      <div v-if="$page.frontmatter.license">
        本文采用<span class="license">{{$page.frontmatter.license}}</span>许可协议
      </div>
      <div v-else-if="$themeConfig.license">
        本博客所有文章除特别声明外，均默认采用<span class="license">{{$themeConfig.license}}</span>许可协议
      </div>
      <div v-else>
        本博客所有文章除特别声明外，均默认采用<span class="license">CC BY-NC-SA 4.0</span>许可协议
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'postCopyright',
  data() {
    return {
      copyrightLink: ''
    }
  },
  mounted() {
    this.copyrightLink = location.href
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/values.scss";

  .post-copyright {
    font-size: 14px;
    padding: .6rem 1rem;
    border-left: 3px solid $word-color-blue;
    background-color: $copyright-bg;
    list-style: none;

    .post-copyright-link a {
      color: $word-color-blue-light;
    }

    .post-copyright-license div {
      display: inline-block;

      .license {
        color: $word-color-blue-light;
        padding: 0 .2rem;
      }
    }
  }
</style>