<template>
    <div
        class="r-table__main__scrollbar"
        :style="{ width: fullWidth + 'px', height: fullHeight + 'px' }"
    ></div>
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
