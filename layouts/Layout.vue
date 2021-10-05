<template>
  <div class="theme-container">
    <blog-header v-on:toggle="handleToggle"></blog-header>

    <div>
      <blog-index :sidebar="sidebar"></blog-index>
      <!-- 主页 -->
      <section :class="['main-container', {'sidebar': sidebar}]">
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
            :filted="$sortedPages"
            :path="`${this.$route.path.split('/')[1]}${this.$route.path.split('/')[1] !== 'page' ? '/' + this.$route.path.split('/')[2] : ''}`"
          ></blog-articles>
        </div>

        <!-- 文章页 -->
        <blog-page v-else></blog-page>
      </section>
    </div>
    <blog-footer></blog-footer>
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
import blogIndex from '@theme/components/blogIndex';
import blogArticles from '@theme/components/blogArticles';

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
    blogIndex,
    blogArticles,
  },
  data() {
    return {
      sidebar: false
    };
  },
  methods: {
    specialPage() {
      return Object.getOwnPropertyNames(this.$page.frontmatter).length === 0;
    },
    handleToggle() {
      this.sidebar = !this.sidebar
    }
  },
  mounted() {
    console.log(this.$page.frontmatter)
  }
};
</script>

<style lang="scss" scoped>
  @import '../styles/values.scss';
  
  .main-container {
    min-height: $container-min-height;
    box-sizing: border-box;
    transition: padding .2s ease-in-out;
    &.sidebar {
      padding-left: 20rem;
    }
  }

  @media screen and (max-width: 768px) {
    .main-container.sidebar {
      padding-left: 0;
    }
  }
</style>