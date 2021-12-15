import Pager from './Pager.vue'
import './index.scss'

export default {
    name: 'PageController',
    props: {
        pageSize: {
            type: Number,
            default: 8
        },
        total: {
            type: Number,
            default: 0
        },
        pageCount: Number,
        pagerCount: {
            type: Number,
            default: 7
        },
        currentPage: {
            type: Number | String,
            default: 1
        },
    },
    data() {
        return {
            internalCurrentPage: 1,
            internalPageSize: 0,
            lastEmittedPage: -1,
            userChangePageSize: false
        }
    },
    render(h) {
        let template = <div class="page-controller"></div>
        const TEMPLATE_MAP = {
            prev: <prev></prev>,
            pager: <pager currentPage={ this.internalCurrentPage } pageCount={ this.internalPageCount } pagerCount={ this.pagerCount } on-change={ this.handleCurrentChange }></pager>,
            next: <next></next>,
        };

        template.children = template.children || []

        for(let compo of Object.keys(TEMPLATE_MAP)) {
            template.children.push(TEMPLATE_MAP[compo])
        }

        return template
    },
    components: {
        Prev: {
            render(h) {
                return (
                    <div class="prev-page">
                        <button on-click={ this.$parent.handlePreClick } class={ { disabled: !(this.$parent.internalCurrentPage > 1) } }>
                            <i class="fa fa-angle-left" aria-hidden="true"></i> Previous
                        </button>
                    </div>
                )
            }
        },
        Next: {
            render(h) {
                return (
                    <div class="next-page">
                        <button on-click={ this.$parent.handleNextClick } class={ { disabled: this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0 } }>
                            Next <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </button>
                    </div>
                )
            }
        },
        Pager
    },
    methods: {
        handlePreClick(event) {
            const target = event.target
            if (target.className.indexOf('disabled') !== -1 || target.parentNode.className.indexOf('disabled') !== -1) {
                return
            }

            this.internalCurrentPage--
            this.emitChange()
        },
        handleNextClick(event) {
            const target = event.target
            if (target.className.indexOf('disabled') !== -1 || target.parentNode.className.indexOf('disabled') !== -1) {
                return
            }

            this.internalCurrentPage++
            this.emitChange()
        },
        handleCurrentChange({
            pageNumber
        }) {
            this.internalCurrentPage = pageNumber
            this.emitChange()
        },
        emitChange() {
            this.$nextTick(() => {
                this.$emit('page-change', {
                    pageNumber: this.internalCurrentPage
                });
            });
        }
    },
    computed: {
        internalPageCount() {
            if (typeof this.total === 'number') {
                return Math.max(1, Math.ceil(this.total / this.internalPageSize));
            } else if (typeof this.pageCount === 'number') {
                return Math.max(1, this.pageCount);
            }
            return null;
        }
    },
    mounted() {
        if (this.currentPage) {
            this.internalCurrentPage = parseInt(this.currentPage)
        }
    },
    watch: {
        pageSize: {
            immediate: true,
            handler(val) {
              this.internalPageSize = isNaN(val) ? 10 : val;
            }
        },
    }
}