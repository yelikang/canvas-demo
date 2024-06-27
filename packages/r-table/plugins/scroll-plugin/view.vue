<template>
    <div class="r-table__scrollbar" @scroll="$_onScroll">
        <div
            class="r-table__scrollbar__content"
            :style="{ width: fullWidth + 'px', height: fullHeight + 'px' }"
        ></div>
    </div>
</template>

<script>
//  现在在外部绘制的滚动条，可以在canvas上面盖一层div,使用div的滚动条；所有事件都作用在div上，然后同步计算canvas信息
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
        overflow: auto;
        // pointer-events: none;

        &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 10px;
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
        &__content {
            min-width: 100%;
        }

        // &__x {
        //     position: absolute;
        //     left: 0;
        //     right: 0;
        //     bottom: 0;
        //     overflow-y: auto;
        //     pointer-events: auto;
        //     > div {
        //         width: inherit;
        //     }

        //     &::-webkit-scrollbar {
        //         /*滚动条整体样式*/
        //         width: 0; /*高宽分别对应横竖滚动条的尺寸*/
        //         height: 10px;
        //     }
        //     &::-webkit-scrollbar-thumb {
        //         /*滚动条里面小方块*/
        //         border-radius: 10px;
        //         background-color: skyblue;
        //     }
        //     &::-webkit-scrollbar-track {
        //         /*滚动条里面轨道*/
        //         box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        //         background: #ededed;
        //         border-radius: 10px;
        //     }
        // }

        // &__y {
        //     position: absolute;
        //     right: 0;
        //     top: 0;
        //     bottom: 0;
        //     overflow-y: auto;
        //     pointer-events: auto;
        //     > div {
        //         width: inherit;
        //     }

        //     &::-webkit-scrollbar {
        //         /*滚动条整体样式*/
        //         width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        //         height: 0;
        //     }
        //     &::-webkit-scrollbar-thumb {
        //         /*滚动条里面小方块*/
        //         border-radius: 10px;
        //         background-color: skyblue;
        //     }
        //     &::-webkit-scrollbar-track {
        //         /*滚动条里面轨道*/
        //         box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        //         background: #ededed;
        //         border-radius: 10px;
        //     }
        // }
    }
}
</style>
