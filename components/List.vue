<template>
  <div class="theme-container">
    <div class="about">
      <Content />
    </div>
    <blog-articles :filted="$listPages" :pageNumber="pageNumber"></blog-articles>
  </div>
</template>

<script>
import blogArticles from "../components/blogArticles";
import blogIndex from "../components/blogIndex";

export default {
  components: {
    blogArticles,
    blogIndex,
  },
  props: ["pageNumber"],
};
</script>

<style lang="scss" scoped>
.about {
  width: 50%;
  height: auto;
  margin: 0 auto;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .about {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
  }
}
</style>