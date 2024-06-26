<template>
    <div class="r-table__scrollbar">
        <div class="r-table__scrollbar__x">
            <div></div>
        </div>
        <div
            class="r-table__scrollbar__y"
            :style="{ width: width + 'px', bottom: width + 'px' }"
            @scroll="$_onScrollY"
            ref="scrollY"
        >
            <div :style="{ height: fullHeight + 'px' }"></div>
        </div>
    </div>
</template>

<script>
import { watch } from 'vue'
export default {
    props: {
        width: {
            type: Number,
            default: 0
        },
        fullWidth: {
            type: Number,
            default: 0
        },
        fullHeight: {
            type: Number,
            default: 0
        },
        scroll: {
            type: Object,
            default: () => {
                return {
                    x: 0,
                    y: 0
                }
            }
        }
    },
    watch:{
        scroll:{
            handler(newVal){
                this.$refs.scrollY.scrollTop = newVal.y
            }
        }
    }
}
</script>

<style lang="less" scoped>
.r-table {
    &__scrollbar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        &__y {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            overflow-y: auto;
            pointer-events: auto;
            > div {
                width: inherit;
            }

            &::-webkit-scrollbar {
                /*滚动条整体样式*/
                width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
                height: 0;
            }
            &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 10px;
                background-color: skyblue;
            }
            &::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: #ededed;
                border-radius: 10px;
            }
        }
    }
}
</style>
