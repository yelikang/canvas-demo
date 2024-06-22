<template>
    <div class="RTable" ref="RTable"></div>
</template>

<script>
import RTable from '@/components/table/index.ts'
export default {
    data() {
        return {}
    },
    mounted() {
        const rTable = new RTable({
            containerEl: this.$refs.RTable,
            options: {}
        })
        const array = [
            {
                name: '张三',
                age: 20
            },
            {
                name: '李四',
                age: 25
            },
            {
                name: '张三',
                age: 20
            },
            {
                name: '李四',
                age: 25
            },
            {
                name: '张三',
                age: 20
            },
            {
                name: '李四',
                age: 25
            },
            {
                name: '张三',
                age: 20
            },
            {
                name: '李四',
                age: 25
            }
        ]

        rTable.setData(array)
    }
}
</script>

<style lang="less" scoped>
.RTable {
    width: 100%;
    height: 100%;
}
</style>
