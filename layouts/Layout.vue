<template>
  <div :class="['theme-container', {'sidebar': sidebar}, {'list': list}]">
    <blog-loading v-if="$site.pages.length === 0" />
    <div v-else>
      <blog-header v-on:toggle="handleList"></blog-header>
      <title-list :sidebar="list"></title-list>
      <blogSidebar :sidebar="sidebar"></blogSidebar>

      <div class="theme-container__inner">
        <!-- 主页 -->
        <section class="main-container">
          <blog-home v-if="$page.frontmatter.home"></blog-home>

          <!-- 列表页 -->
          <blog-list
            v-else-if="$page.frontmatter.list"
            :pageNumber="$route.params.pageNumber"
          ></blog-list>

          <!-- 分类页 -->
          <blog-categories v-else-if="$page.frontmatter.categoriesPage"></blog-categories>

          <!-- 标签页 -->
          <blog-tags v-else-if="$page.frontmatter.tagsPage"></blog-tags>

          <!-- 关于页 -->
          <about-me v-else-if="$page.frontmatter.aboutme"></about-me>

          <!-- 特殊页 -->
          <div v-else-if="specialPage()">
            <blog-category
              v-if="$route.params.category"
              :category="$route.params.category"
              :child="$route.params.child"
              :pageNumber="$route.params.pageNumber || '1'"
            ></blog-category>
            <blog-tag
              v-else-if="$route.params.tag"
              :tag="$route.params.tag"
              :pageNumber="$route.params.pageNumber || '1'"
            ></blog-tag>
            <blog-articles
              v-else
              :pageNumber="$route.params.pageNumber || '1'"
              :filted="$listPages"
              :path="`${this.$route.path.split('/')[1]}${this.$route.path.split('/')[1] !== 'page' ? '/' + this.$route.path.split('/')[2] : ''}`"
            ></blog-articles>
          </div>

          <!-- 文章页 -->
          <blog-page v-else></blog-page>
          <blog-footer v-if="!$page.frontmatter.home"></blog-footer>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import blogHome from "@theme/components/Home";
import blogList from "@theme/components/List";
import blogCategories from "@theme/components/Categories";
import blogCategory from "@theme/components/Category";
import blogTags from "@theme/components/Tags";
import blogTag from "@theme/components/Tag";
import blogPage from '@theme/components/Page';
import AboutMe from '@theme/components/AboutMe';
import titleList from '@theme/components/titleList';
import blogArticles from '@theme/components/blogArticles';
import blogSidebar from '@theme/components/blogSidebar'

export default {
  components: {
    blogHome,
    blogList,
    blogCategories,
    blogCategory,
    blogTags,
    blogTag,
    AboutMe,
    blogPage,
    titleList,
    blogArticles,
    blogSidebar
  },
  data() {
    return {
      sidebar: false,
      list: false
    };
  },
  mounted() {
    this.$eventBus.$on('list', this.handleList)
    this.$eventBus.$on('sidebar', this.handleSidebar)
  },
  methods: {
    specialPage() {
      return Object.getOwnPropertyNames(this.$page.frontmatter).length === 0;
    },
    handleSidebar() {
      if(this.list) this.list = false
      this.sidebar = !this.sidebar
    },
    handleList() {
      if(this.sidebar) this.sidebar = false
      this.list = !this.list
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../styles/values.scss';

  .theme-container__inner {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .theme-container {
    transition-duration: .2s;
    transition-property: transform background-color;
    transition-timing-function: ease-in-out;
    // transition: all .2s ease-in-out;

    &.list .main-container,
    &.sidebar .main-container {
      padding-left: 20rem;
    }
  }

  .main-container {
    width: 100vw;
    min-height: $container-min-height;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media screen and (max-width: 768px) {
    .theme-container.list .main-container {
      padding-left: 0;
    }

    .theme-container.sidebar {
      padding-left: 0;
      background-color: $container-bg;

      .theme-container {
        margin: 1.5rem;
        background-color: $primary-background;
      }

      .theme-container__inner {
        perspective: 1000px;
        overflow: hidden;
      }

      .main-container {
        height: 100vh;
        overflow: hidden;
        padding: 0;
        border-radius: 0.85rem;
        // transform: translate(20rem);
        background-color: $primary-background;
        transform: translate(15rem) rotateY(30deg) scale(0.85);
      }
    }
  }
</style>