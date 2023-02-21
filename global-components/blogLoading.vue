<template>
  <div class="blog-loading">
    <i class="fa fa-spinner fa-pulse fa-5x" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
  name: "blogLoading",
};
</script>

<style lang="scss" scoped>
.blog-loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #A2A2A3;
  background-color: #f3f3f4;
}
</style>
