<template>
  <div class="navigation-bar">
    <div class="navigation-bar-item" v-for="item in $themeConfig.nav" :key="item.text">
      <bar-item v-if="!item.items" :item="item"></bar-item>
      <bar-list v-else :list="item"></bar-list>
    </div>
  </div>
</template>

<script>
import barItem from "./barItem";
import barList from "./barList";

export default {
  name: "navigationBar",
  components: {
    barItem,
    barList,
  },
};
</script>