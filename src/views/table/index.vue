<template>
    <div class="RTable">
        <div ref="RTable" class="RTable__container"></div>
    </div>
</template>

<script>
import RTable from 'packages/r-table/index.ts'
export default {
    data() {
        return {}
    },
    mounted() {
        const rTable = new RTable({
            containerEl: this.$refs.RTable,
            options: {
                columns: [
                    {
                        title: '姓名',
                        key: 'name',
                        width: 'auto'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '工作',
                        key: 'worker'
                    }
                ]
            }
        })
        const array = [
            {
                name: '张三666666666',
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
    padding: 10px 20px;
    &__container {
        height: 200px;
        width: 500px;
    }
}
</style>
