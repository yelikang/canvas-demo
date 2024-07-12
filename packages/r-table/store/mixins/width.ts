export default {
    /**
     * 计算列宽
     */
    _computeWidth() {
        console.log('_computeWidth')
        const { defaultCellWidth, paddingWidth } = this._options
        const measureText = this._canvas.measureText.bind(this._canvas)

        const autoColumns = []
        const unsetColumns = []
        // 固定宽度的列宽总和
        let fixedWidthTotal = 0

        this._options.columns?.forEach((col: any) => {
            const { width, title, key } = col
            switch (width) {
                case undefined:
                    // 未指定宽度，设置为默认宽度
                    // col.width = defaultCellWidth
                    unsetColumns.push(col)
                    break
                case 'auto':
                    // 自适应列(获取当前列最宽内容)
                    let maxWidthText = title
                    this._datas.forEach((row) => {
                        if (measureText(row[key]) > measureText(maxWidthText)) {
                            maxWidthText = row[key]
                        }
                    })
                    // 文字前后偏移
                    col.computeWidth =
                        measureText(maxWidthText) + paddingWidth * 2
                    autoColumns.push(col)
                    break
                default:
                    col.computeWidth = +width
                    fixedWidthTotal = fixedWidthTotal + Number(width)
                    break
            }
        })

        // 需要分配列宽的列数
        let assignSize = unsetColumns.length + autoColumns.length

        // 剩余宽度(减去滚动条的10px)
        let remainingWidth = this._viewSize.width - fixedWidthTotal - 10

        if (assignSize > 0) {
            // 先分配auto列宽
            autoColumns.forEach((col: any) => {
                // 平均宽度
                let meanWidth = remainingWidth / assignSize
                meanWidth = meanWidth > 0 ? meanWidth : defaultCellWidth

                // 剩余平均宽度大于列最大内容宽度，采用平均最大宽度
                const wid =
                    meanWidth > col.computeWidth ? meanWidth : col.computeWidth
                col.computeWidth = wid

                remainingWidth = remainingWidth - wid
                assignSize--
            })
            // 剩余宽度，给未设置宽度的列平均分配
            let meanWidth = remainingWidth / assignSize
            meanWidth = meanWidth > 0 ? meanWidth : defaultCellWidth
            unsetColumns.forEach((col: any) => {
                col.computeWidth = meanWidth

                remainingWidth = remainingWidth - meanWidth
                assignSize--
            })
        }

        this._computeFullSize()
    },
    /**
     * 计算实际高度
     */
    _computeFullSize() {
        const { defaultRowHeight } = this._options
        // 实际整体宽高
        this._fullSize = {
            width:
                this._options.columns?.reduce((acc, col: any) => {
                    return col?.computeWidth + acc
                }, 0) || 0,
            // 数据高度 + 头部高度
            height: this._datas.length * defaultRowHeight + defaultRowHeight
        }
    }
}
