<template>
      <div class="blog-header">
            <!-- <tool-bar></tool-bar> -->
            <div class="tool-bar">
                  <div class="toggle">
                        <button class="show-list" @click="$emit('toggle')">
                              <i class="fa fa-bars" aria-hidden="true"></i>
                        </button>
                  </div>
                  <div class="tool-bar-1">
                        <navigation-bar></navigation-bar>
                  </div>
                  <!-- <mobile-bar></mobile-bar> -->
                  <div class="search">
                        <SearchBox />
                  </div>
                  <div class="tool-bar-2">
                        <bar-item v-for="item in $themeConfig.externalLinks" :item="item" :key="item.text"></bar-item>
                  </div>
            </div>
            <!-- <blog-index></blog-index> -->
      </div>
</template>

<script>
      import toolBar from '../components/toolBar'
      import mobileBar from '../components/mobileBar'
      import navigationBar from '../components/navBar/navigationBar'
      import barItem from '../components/navBar/barItem'
      import SearchBox from '@SearchBox'
      // import blogIndex from '../components/blogIndex'
      import {
            visibilityChange
      } from '../util/utils'
      import '../styles/header.scss'

      export default {
            name: 'blogHeader',
            components: {
                  toolBar,
                  // blogIndex
                  mobileBar,
                  SearchBox,
                  navigationBar,
                  barItem
            },
            mounted() {
                  let title = document.title

                  document.addEventListener(visibilityChange(document), function (evnet) {
                        let hidden = event.target.hidden
                        document.title = hidden ? '记得回来哦！' : title
                  })
                  if (window.location.pathname == '/') {
                        let header = document.querySelector('.blog-header')
                        header.classList.add('home')
                        header.classList.add('hide')
                  }
            },
            watch: {
                  $route(to, from) {
                        let header = document.querySelector('.blog-header')
                        if (to.path == '/') {
                              header.classList.add('home')
                              header.classList.add('hide')
                        } else {
                              header.classList.remove('home')
                              header.classList.remove("hide");
                        }
                  }
            }
      }
</script>

<style lang="scss" scoped>
      .toggle {
            padding-left: 1.6rem;
            display: flex;
            justify-content: center;
            align-items: center;
      }

      .show-list {
            font-size: 20px;
      }

      @media screen and (max-width: 768px) {
            .blog-header {
                  display: none;

            }
            // .tool-bar {
                  // padding: 0 24px;
                  // justify-content: flex-end;
            // }

            // .tool-bar-1,
            // .tool-bar-2,
            // .toggle {
            //       display: none;
            // }
      }
</style>