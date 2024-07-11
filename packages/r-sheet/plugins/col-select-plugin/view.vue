<template>
    <div
        class="r-table__main__selected-box"
        :style="{ height: fullHeight + 'px' }"
    ></div>
</template>

<script>
export default {
    props: {
        fullHeight: {
            type: Number,
            default: 0
        }
    }
}
</script>
