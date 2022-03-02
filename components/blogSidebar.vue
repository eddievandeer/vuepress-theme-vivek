<template>
    <div class="blog-sidebar" :class="sidebar ? '' : 'hide'">
        <div class="sidebar-header">
            <div class="logo-box">
                <img class="header-logo" :src="logo" alt="">
            </div>
            <p class="header-title">{{$site.title}}</p>
            <p class="header-description">{{$site.description}}</p>
        </div>
        <div class="sidebar-subnav">
            <router-link class="subnav-item" v-for="item in subnav" :key="item.text" :to="item.link">
                <span class="subnav-item__count">{{item.count}}</span>
                <span class="subnav-item__name">{{item.text}}</span>
            </router-link>
        </div>
        <div class="sidebar-nav">
            <router-link class="nav-item" v-for="item in nav" :key="item.text" :to="item.link">
                {{ item.text }}
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'blogSidebar',
        props: ['sidebar'],
        computed: {
            logo() {
                return this.$themeConfig.logo
            },
            subnav() {
                let total = this.$sitePages.length
                let cTotal = this.$categories.size
                let tTotal = this.$tags.size
                for (const category of this.$categories.values()) {
                    if (category.children !== undefined) {
                        cTotal += category.children.size - 1
                    }
                }
                return [{
                    text: 'Archives',
                    link: '/page/1',
                    count: total
                }, {
                    text: 'Categories',
                    link: '/categories',
                    count: cTotal
                }, {
                    text: 'Tags',
                    link: '/tags',
                    count: tTotal
                }]
            },
            nav() {
                return this.$themeConfig.nav.filter((item) => {
                    return item.link !== undefined
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/values.scss";

    .blog-sidebar {
        z-index: 10;
        width: 320px;
        height: calc(100vh - 60px);
        font-size: 16px;
        margin: 0;
        padding: 20px 15px;
        box-sizing: border-box;
        border-right: 1px solid #d1d1d1;
        background-color: $primary-background;
        transition: transform 0.15s .2s ease-out;
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

        &.hide {
            transform: translateX(-320px);
            transition: transform 0.15s ease-out;

            .nav-item::after {
                opacity: 0;
                transition: transform 0.15s ease-out;
            }
        }
    }

    .sidebar-header {
        @extend .flex-column;
        text-align: center;
    }

    .logo-box {
        width: 8rem;
        height: 8rem;
        margin-top: 2rem;
    }

    .header-logo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .header-title {
        font-size: 26px;
        font-family: Cursive,"Josefin Sans","PingFang SC","Microsoft YaHei";
        margin: 1rem 0 .5rem;
    }

    .header-description,
    .subnav-item__name {
        opacity: .56;
    }

    .header-description {
        margin: 0;
        padding: 0 1.6rem 1rem;
    }

    .sidebar-subnav {
        margin-top: .5rem;
        padding: 0 1rem;
        @extend .flex;
        justify-content: space-between;
    }

    .subnav-item {
        width: 30%;
        color: $word-color;
        padding: .5rem 0;
        @extend .flex-column;

        &:hover {
            color: $word-color-blue;
        }
    }

    .subnav-item__count {
        font-size: 20px;
    }
    
    .subnav-item__name {
        font-size: 14px;
        margin-top: .2rem;
    }

    .sidebar-nav {
        margin-top: 1.5rem;
        @extend .flex-column;
        align-items: flex-end;
    }

    .nav-item {
        line-height: 2.8rem;
        color: $word-color;
        padding: 0 1.5rem;
        position: relative;
        transition: all .2s ease-in-out;

        &::after {
            content: '';
            width: 7px;
            height: 7px;
            background-color: $primary-background;
            border: 1px solid #d1d1d1;
            border-radius: 50%;
            transform: translate(50%,-50%);
            transition: all .15s .2s ease-in-out;
            position: absolute;
            top: 50%;
            right: -15px;
        }

        &:hover,
        &.router-link-exact-active {
            color: $word-color-blue;
            font-size: 18px;
        }

        &:hover::after,
        &.router-link-exact-active::after {
            background-color: $word-color-blue;
        }
    }

    @media screen and (max-width: 768px) {
        .blog-sidebar {
            width: 300px;
            height: 100vh;
            background-color: transparent;
            border-right: none;
            top: 0;
        }

        .header-title,
        .header-description,
        .subnav-item__name {
            color: white;
        }

        .subnav-item {
            color: white;
            border-radius: 10px;
            background: linear-gradient(145deg, #2f4256, #283848);
            box-shadow:  4px 4px 8px #253544,
                        -4px -4px 8px #33475c;
        }
    
        .subnav-item__name {
            font-size: 14px;
        }

        .sidebar-nav {
            align-items: flex-start;
        }

        .nav-item {
            color: white;

            &::after {
                opacity: 0;
            }

            &:hover,
            &.router-link-exact-active {
                color: $word-color-blue-light;
                font-size: 20px;
            }
        }
    }
</style>