<template>
  <div class="blog-footer">
    <div class="beian" v-if="footer.beian">
      <a :href="footer.beian.link" target="_blank" rel="noopener noreferrer">
        {{ footer.beian.context }}
      </a>
    </div>
    <p>Copyright © {{ footer.createYear }}-{{ footer.currentYear || 'Present' }} {{ $themeConfig.author }} | Theme By Vivek</p>
    <div class="support" v-html="footer.support"></div>
  </div>
</template>

<script>
export default {
  name: "blogFooter",
  computed: {
    footer() {
      return this.$themeConfig.footer
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/values.scss";

.blog-footer {
  @extend .flex;
  width: 100%;
  height: 160px;
  font-size: 0.9rem;
  background-color: #e9e9e9;
  border-top: 1px solid #d1d1d1;
  flex-direction: column;

  .beian a {
    color: #0078e7;
    transition: color 0.1s;

    &:hover {
      color: #db2828;
    }
  }

  .support {
    @extend .flex;
    width: 100%;
    height: 30px;

    a {
      @extend .flex;
      margin: 0.2rem;
    }
  }

  p {
    text-align: center;
    line-height: 26px;
  }
}
</style>