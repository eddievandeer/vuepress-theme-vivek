<template>
      <div class="drop-container">
            <div class="down" @click="dropDown">
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
            </div>
      </div>
</template>

<script>
      import { IsPC } from '@theme/util/utils'
      export default {
            name: 'dropDown',
            methods: {
                  dropDown() {
                        let header = document.querySelector('.blog-header')
                        const main = document.querySelector('.blog-home')
                        const home = document.querySelector('.home-page')

                        header.classList.remove('hide')
                        
                        if(IsPC()) {
                              window.scrollTo(0, main.clientHeight)
                        }
                        else {
                              home.scrollTo({
                                    top: main.clientHeight,
                                    left: 0,
                                    behavior: 'smooth'
                              })
                        }
                  }
            }
      }
</script>

<style lang="scss" scoped>
      @import '../styles/values.scss';

      .drop-container {
            width: 100%;
            height: 80px;
            position: absolute;
            bottom: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
      }

      .down {
            font-size: 45px;
            animation: anima 1.5s cubic-bezier(0.6, 0.04, 0.52, 1.01) infinite;
            cursor: pointer;

            i {
                  color: $primary-background;
            }
      }

      @keyframes anima {
            0% {
                  transform: translateY(0px);
            }

            60% {
                  transform: translateY(30px);
            }

            100% {
                  transform: translateY(0px);
            }
      }
</style>