export default {
    setData(_datas: Array<any>) {
        this._datas = _datas
        this._computeWidth()
    },
    // 获取可视区域数据(滚动加载)
    _getViewData() {
        const { defaultRowHeight } = this._options
        const { height } = this._viewSize
        const startRow = Math.floor(this._scroll.y / defaultRowHeight)

        const endRow = Math.ceil((this._scroll.y + height) / defaultRowHeight)

        const viewData = this._datas.slice(startRow, endRow)
        // 标识行实际索引
        viewData.forEach((row, index) => {
            row.rowIndex = startRow + index
        })

        return viewData
    }
}
