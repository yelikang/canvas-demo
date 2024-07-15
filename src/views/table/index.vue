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
        this.rTable = new RTable({
            containerEl: this.$refs.RTable,
            columns: [
                {
                    title: '姓名姓名姓名姓名姓名姓名6',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age',
                },
                {
                    title: '工作',
                    key: 'worker',
                    width: '200'
                },
                {
                    title: '备注',
                    key: 'remark',
                }
            ]
        })

        function generateRecords(num) {
            const records = []
            for (let i = 0; i < num; i++) {
                records.push({
                    name: `张三${i}`,
                    age: i,
                    worker: `coder ${i}`,
                    remark: `备注${i}`
                })
            }
            return records
        }
        const array = generateRecords(1000)
        this.rTable.setData(array)
    },
    destroyed() {
        this.rTable.destroy()
    }
}
</script>

<style lang="less" scoped>
.RTable {
    width: 500px;
    height: 100%;
    padding: 10px 20px;
    &__container {
        height: 100%;
    }
}
</style>
