<template>
    <div class="list-container" :class="{hide: !sidebar}">
        <div class="list-item" v-for="(title, index) in titles" :key="index" :class="{active: index==activeIndex}">
            <a class="list-item-link" v-if="title.url" :target="title.level == 3 ? '__blank' : ''" :href="title.url"
                :class="setLevel(title.level)">
                <p>{{ title.title }}</p>
            </a>
            <a class="list-item-link" v-else :href="'#' + title.slug" :class="setLevel(title.level)">
                <p>{{ title.title }}</p>
            </a>
        </div>
    </div>
</template>

<script>
    import {
        parseTitle,
        debounce
    } from "../util/utils";

    function doScroll() {
        const scrolled = Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
        )
        // let scrolled = document.documentElement.scrollTop || document.body.scrollTop;

        const allTitles = document.querySelectorAll(".content__default h2,h3");

        for (let i = 0; i < allTitles.length; i++) {
            const title = allTitles[i]
            const nextTitle = allTitles[i + 1]

            if (
                (i === 0 && scrolled === 0) ||
                (
                    scrolled >= title.offsetTop - 30 &&
                    (!nextTitle || scrolled < nextTitle.offsetTop - 30)
                )
            ) {
                this.activeIndex = i
                break;
            }
        }
    }

    export default {
        name: "titleList",
        props: ['sidebar'],
        data() {
            return {
                titles: [],
                activeIndex: -1
            };
        },
        methods: {
            setLevel(level) {
                let index_level = "index-level-";
                return index_level + level;
            },
            setTitles() {
                this.titles = parseTitle(this.$themeConfig.nav);
                let url = window.location.pathname.split("/")[1];
                // console.log(url);
                if (this.$page.headers) {
                    // this.activeIndex = 0
                    this.titles = this.$page.headers
                    // this.titles.push(...this.$page.headers);
                }
            },
            onScroll: debounce(doScroll, 500)
        },
        mounted() {
            this.setTitles();
            if (!this.titles[0].url) {
                // this.onScroll()
                window.addEventListener("scroll", this.onScroll);
            }
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.onScroll);
        },
        watch: {
            $route(to, from) {
                this.setTitles()
                const reg = /(\.html)$/
                const toPath = to.path.split('/').pop()
                
                if (!reg.test(toPath)) {
                    this.activeIndex = -1
                    window.removeEventListener("scroll", this.onScroll);
                } else {
                    if (!this.titles[0].url) {
                        // this.onScroll()
                        window.addEventListener("scroll", this.onScroll);
                    }
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../styles/values.scss";

    .list-container {
        z-index: 20;
        width: 320px;
        height: $container-height;
        font-size: 16px;
        margin: 0;
        padding: 20px 15px;
        box-sizing: border-box;
        border-right: 1px solid #eaecef;
        background-color: $primary-background;
        border-right: 1px solid #d1d1d1;
        transition: transform 0.15s ease-out;
        overflow-y: scroll;
        position: fixed;
        top: 60px;
        left: 0px;

        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }

        &::-webkit-scrollbar-track {
            background-color: #adadad3f;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #cacaca;
        }

        // @media screen and (max-width: 768px) {
        &.hide {
            transform: translateX(-320px);
        }

        // }
    }

    .list-item {
        width: 100%;
        min-height: 20px;
        // margin: 10px 0;
        // border-bottom: 1px solid #d1d1d1;
        border-left: 4px solid transparent;
        background-color: $primary-background;
        transition-property: box-shadow, background-color;
        transition-duration: 0.2s, 0.2s;
        transition-timing-function: ease-in-out;

        &:hover,
        &.active {
            // background-color: var(--color-bg-hover);
            // border-bottom: 1px solid transparent;
            // border-radius: 5px;
            // box-shadow: $primary-shadow;

            a {
                color: $list-item-color-active;
            }
        }

        &.active {
            border-left-color: $list-item-color-active;
        }
    }

    .list-item-link {
        width: 100%;
        height: 100%;
        color: $list-item-color;
        text-decoration: none;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        &.index-level-2 {
            font-size: 16px;
            font-weight: 600;

            p {
                padding: 5px 0 5px 20px;
                margin: 0;
            }
        }

        &.index-level-3 {
            font-size: 14px;

            p {
                padding: 5px 0 5px 40px;
                margin: 0;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .list-container {
            width: 280px;
            height: 100vh;
            top: 0;
        }
    }
</style>