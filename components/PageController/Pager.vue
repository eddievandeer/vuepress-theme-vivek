<template>
    <keep-alive>
        <ul class="pager" @click="onPagerClick">
            <li v-if="showPrevMore">...</li>
            <li class="number" :class="{ active: current === pager }" v-for="pager in pagers" :key="pager">
                {{ pager }}
            </li>
            <li v-if="showNextMore">...</li>
        </ul>
    </keep-alive>
</template>

<script>
    export default {
        props: {
            currentPage: Number,
            pageCount: Number,
            pagerCount: Number
        },
        data() {
            return {
                current: 1,
                url: '',
                prePageUrl: '',
                nextPageUrl: '',
                showPrevMore: false,
                showNextMore: false
            }
        },
        computed: {
            pagers() {
                const pagerCount = this.pagerCount
                const halfPagerCount = (pagerCount - 1) / 2
                const currentPage = this.currentPage
                const pageCount = this.pageCount + 1

                let showPrevMore = false
                let showNextMore = false

                if (pageCount > pagerCount) {
                    if (currentPage > pagerCount - halfPagerCount) {
                        showPrevMore = true
                    }
                    if (currentPage < pageCount - halfPagerCount) {
                        showNextMore = true
                    }
                }

                const array = []

                if (showPrevMore && !showNextMore) {
                    const startPage = pageCount - (pagerCount - 2);
                    for (let i = startPage; i < pageCount; i++) {
                        array.push(i)
                    }
                } else if (!showPrevMore && showNextMore) {
                    for (let i = 1; i < pagerCount; i++) {
                        array.push(i)
                    }
                } else if (showPrevMore && showNextMore) {
                    const offset = Math.floor(pagerCount / 2) - 1
                    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
                        array.push(i)
                    }
                } else {
                    for (let i = 1; i < pageCount; i++) {
                        array.push(i)
                    }
                }

                this.showPrevMore = showPrevMore
                this.showNextMore = showNextMore

                return array
            }
        },
        methods: {
            isDisabled() {

            },
            onPagerClick(event) {
                const target = event.target
                if (target.tagName === 'UL') {
                    return
                }

                let newPage = Number(event.target.textContent)
                const pageCount = this.pageCount

                if (!isNaN(newPage)) {
                    if (newPage < 1) {
                        newPage = 1
                    }
                    if (newPage > pageCount) {
                        newPage = pageCount
                    }

                    if (newPage !== this.current) {
                        this.current = newPage

                        this.$emit('change', {
                            pageNumber: this.current
                        })
                    }
                }
            }
        },
        mounted() {
            if (this.currentPage) {
                this.current = parseInt(this.currentPage)
            }
        },
        watch: {
            currentPage() {
                this.current = parseInt(this.currentPage)
            }
        }
    }
</script>