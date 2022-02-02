<template>
    <div class="image-box">
        <div :class="['image-modal', open ? 'open' : 'close']">
            <div class="image-header">
                <button class="image-close" @click="handleClose">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <div
                class="image-container"
                @mousedown="handleDown"
                @mousemove="handleMove"
                @mouseup="handleUp"
                @mouseleave="handleUp"
                @touchstart="handleDown"
                @touchmove="handleMove"
                @touchend="handleUp"
                @touchcancel="handleUp"
            >
                <img :class="['image-zoom', times[zoom]]" :src="src" :alt="alt" draggable="false" ref="image">
            </div>
            <div class="image-controller">
                <button class="image-enlarge" @click="enlargeImage">
                    <i class="fa fa-search-plus" aria-hidden="true"></i>
                </button>
                <button class="image-shrink" @click="shrinkImage">
                    <i class="fa fa-search-minus" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
let lastX = 0, lastY = 0
let nowX = 0, nowY = 0
let minusX = 0, minusY = 0
let down = false

export default {
    name: "ImageWrapper",
    props: {
        src: String,
        alt: {
            default: 'Loading',
            type: String
        },
        open: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            zoom: 2,
            times: ['shrink-2', 'shrink-1', '', 'enlarge-1', 'enlarge-2']
        }
    },
    methods: {
        handleClose() {
            this.zoom = 2
            this.$refs.image.style = ''
            minusX = 0
            minusY = 0
            this.$emit('close')
        },
        handleDown(e) {
            const event = e || window.event
            event.preventDefault()

            lastX = (event.clientX ? event.clientX : event.touches[0].clientX) - minusX
            lastY = (event.clientY ? event.clientY : event.touches[0].clientY) - minusY
            // lastX = event.clientX - (minusX == 0 ? this.$refs.image.offsetLeft : minusX)
            // lastY = event.clientY - (minusY == 0 ? this.$refs.image.offsetTop : minusY)

            down = true
        },
        handleMove(e) {
            if(down) {
                let event = e || window.event
                event.preventDefault()

                const edgeX = this.$refs.image.clientWidth - 150
                const edgeY = this.$refs.image.clientHeight - 300

                nowX = event.clientX !== undefined ? event.clientX : event.touches[0].clientX
                nowY = event.clientY !== undefined ? event.clientY : event.touches[0].clientY

                let minusX = nowX - lastX
                let minusY = nowY - lastY

                if(Math.abs(minusX) > edgeX) {
                    minusX = minusX > 0 ? edgeX : -edgeX
                }

                if(Math.abs(minusY) > edgeY) {
                    minusY = minusY > 0 ? edgeY : -edgeY
                }

                this.$refs.image.style = `top: ${minusY}px; left: ${minusX}px;`
            }
        },
        handleUp() {
            minusX = nowX - lastX
            minusY = nowY - lastY
            down = false
        },
        enlargeImage() {
            if(this.zoom < this.times.length - 1) {
                this.zoom = this.zoom + 1
            }
        },
        shrinkImage() {
            if(this.zoom > 0) {
                this.zoom = this.zoom - 1
            }
        }
    }
}
</script>

<style lang="scss">
    @import '../styles/values.scss';

    .image-modal {
        z-index: 80;

        &.open {
            @extend .flex-column;
            width: 100%;
            height: 100vh;
            background-color: rgba($color: #000000, $alpha: 0.5);
            position: fixed;
            top: 0;
            left: 0;
        }

        &.close {
            display: none;
            position: relative;

            .image-controller {
                display: none;
            }
        }
    }

    .image-container {
        width: 100%;
        height: 90vh;
        @extend .flex;
        overflow: hidden;
    }

    .image-zoom {
        width: 100%;
        height: auto;
        transition: transform .2s ease-in-out;
        position: relative;
        top: 0;
        left: 0;
    }

    .image-zoom.enlarge-1 {
        transform: scale(1.5);
    }

    .image-zoom.enlarge-2 {
        transform: scale(2);
    }

    .image-zoom.shrink-1 {
        transform: scale(0.6);
    }

    .image-zoom.shrink-2 {
        transform: scale(0.3);
    }

    .image-header {
        width: 100%;
        background-color: rgba($color: #000000, $alpha: 0.6);
        box-sizing: border-box;
        padding: .5rem 1.5rem;
        position: relative;
        display: flex;
        justify-content: flex-end;
    }

    .image-close {
        color: white;
        font-size: 28px;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .image-controller {
        @extend .flex;
        flex: 1;
        width: 100%;
        background-color: rgba($color: #000000, $alpha: 0.6);
    }

    .image-enlarge,
    .image-shrink {
        width: 3rem;
        height: 3rem;
        color: white;
        font-size: 30px;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
</style>