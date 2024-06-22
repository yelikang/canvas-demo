<template>
    <div class="app">
        <ul>
            <li>
                <a href="#/table">表格</a>
            </li>
        </ul>

        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {}
</script>

<style lang="less" scoped>
*{
    padding:0;
    margin: 0;
}
.app {
    height: 100%;
    display: flex;
    ul {
        flex-basis: 100px;
        li {
            list-style: none;
            cursor: pointer;
        }
    }
    > div {
        flex-grow: 1;
    }
}
</style>
