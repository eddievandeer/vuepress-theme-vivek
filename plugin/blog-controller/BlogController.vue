<template>
    <div class="blog-controller">
        <div class="controller-menu">
            <button class="show-menu controller-item">
                <div class="item-dot"></div>
            </button>
            <button class="show-list controller-item" @click="toggleList">
                <i class="fa fa-list-ul" aria-hidden="true"></i>
            </button>
            <button class="back-to-top controller-item" @click="backToTop">
                <i class="fa fa-chevron-up" aria-hidden="true"></i>
            </button>
            <button class="show-sidebar controller-item" @click="toggleSidebar">
                <i class="fa fa-columns" aria-hidden="true"></i>
            </button>
            <button class="change-mode controller-item" @click="toggleMode">
                <i v-if="mode === 0" class="fa fa-sun-o" aria-hidden="true" style="color: #FFE000"></i>
                <i v-if="mode === 1" class="fa fa-moon-o" aria-hidden="true" style="color: #31BCEE"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import { IsPC } from '@theme/util/utils'
    export default {
        name: 'BlogController',
        data() {
            return {
                mode: 0
            }
        },
        mounted() {
            const localMode = localStorage.getItem('mode')

            if(localMode) {
                this.mode = parseInt(localMode)
            }
            if(this.mode === 1) document.documentElement.classList.add('dark')
        },
        methods: {
            toggleList() {
                this.$eventBus.$emit('list')
            },
            toggleSidebar() {
                this.$eventBus.$emit('sidebar')
            },
            toggleMode() {
                this.mode = (this.mode + 1) % 2
                document.documentElement.classList.toggle('dark')
                localStorage.setItem('mode', this.mode)
            },
            backToTop() {
                const home = document.querySelector('.home-page')
                const curPath = this.$route.path
                
                if (IsPC() || curPath !== '/') {
                    window.scrollTo(0, 0)
                } else {
                    home.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/values.scss';

    .blog-controller {
        z-index: 50;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
    }

    .controller-item:active {
        -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
        -moz-tap-highlight-color:rgba(0, 0, 0, 0);
        -ms-tap-highlight-color:rgba(0, 0, 0, 0);
        -o-tap-highlight-color:rgba(0, 0, 0, 0);
        // tap-highlight-color:rgba(0, 0, 0, 0);
    }

    .controller-menu:focus-within {
        .show-menu {
            transform: rotateZ(90deg);
        }

        .controller-item {
            opacity: 1;
        }

        .back-to-top {
            transform: translateY(-4.5rem) scale(1);
        }

        .show-list {
            transform: translateY(-8.5rem) scale(1);
        }

        .show-sidebar {
            transform: translateX(-4.5rem) scale(1);
        }

        .change-mode {
            transform: translateX(-4.5rem) translateY(-4.5rem) scale(1);
        }
    }

    .controller-menu.hide {
        .controller-item:not(.show-menu) {
            opacity: 0;
            transform: scale(0.1);
        }

        .show-menu {
            transform: rotateZ(0);
        }
    }

    .controller-item {
        color: white;
        cursor: pointer;
        border: none;
        border-radius: 50%;
        background-color: rgba(85, 85, 85, .9);
        position: absolute;
        bottom: 1rem;
        right: 0.5rem;

        &:hover {
            background-color: rgba(102, 102, 102, .9);
        }
    }

    .controller-item:not(.show-menu) {
        width: 3.2rem;
        height: 3.2rem;
        font-size: 18px;
        opacity: 0;
        transform: scale(0.1);
        transition-duration: 0.3s;
        transition-property: transform, opacity;
        transition-timing-function: ease-in-out;
    }

    .show-menu {
        z-index: 50;
        width: 3.8rem;
        height: 3.8rem;
        font-size: 22px;
        background-color: rgba(180, 180, 181, .9);
        transition: transform .4s cubic-bezier(0, 1.7, 0.69, 0.79);
        @extend .flex;

        &:hover {
            background-color: rgba(200, 200, 202, .9);
        }
    }

    .item-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: white;
        position: relative;

        &::before,
        &::after {
            content: '';
            width: inherit;
            height: inherit;
            border-radius: inherit;
            background-color: white;
            position: absolute;
        }

        &::before {
            left: 200%;
        }

        &::after {
            right: 200%;
        }
    }
</style>