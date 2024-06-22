const defaultOptions: RTableOption = {
    bg: '#fff',
    // 行高
    rowHeight: 30,
    // 边框颜色
    borderColor: 'green'
}

export default class RTable {
    _containerEl: HTMLElement
    _el: HTMLCanvasElement
    _options: RTableOption
    _originalData: Array<any>
    constructor(_params: RTableParams) {
        const { containerEl, options } = _params
        this._containerEl = containerEl
        this._options = Object.assign({}, defaultOptions, options)
    }
    setData(_data: Array<any>) {
        this._originalData = _data
        this._initEl()
        this.render()
    }
    render() {
        const ctx = this.context
        if (ctx) {
            const { width, height } = this._el
            const { bg, rowHeight, borderColor } = this._options
            // 清空画布
            ctx.clearRect(0, 0, width, height)
            // 填充颜色
            ctx.fillStyle = bg
            // 填充整个画布
            ctx.fillRect(0, 0, width, height)

            // 列宽(根据用户传入的列宽信息、剩余列自适应计算列宽)
            const columnWidth = [80, 80]

            this._originalData.forEach((row, rowIndex) => {
                Object.keys(row).forEach((key, colIndex) => {
                    // ================   位置计算
                    // 计算单元格起始位置
                    const cellX =
                        colIndex === 0
                            ? 0
                            : columnWidth.reduce((acc, cur, curIndex) => {
                                  if (curIndex < colIndex) {
                                      // 前面的列宽相加
                                      return acc + cur
                                  } else {
                                      return acc
                                  }
                              }, 0)
                    const cellY = rowIndex * rowHeight
                    // 列宽
                    const cellWidth = columnWidth[colIndex]
                    // 行高
                    const cellHeight = rowHeight

                    // ==============   边框绘制(切换横竖线绘制，边框绘制会重叠) ====
                    // 设置画笔颜色
                    ctx.strokeStyle = borderColor
                    // 设置线的宽度
                    ctx.lineWidth = .5
                    // 绘制一个矩形框
                    ctx.strokeRect(cellX, cellY, cellWidth, cellHeight)

                    // =============   文本绘制
                    // 文本颜色
                    ctx.fillStyle = '#000'
                    // 字体样式
                    ctx.font = '12px Arial'
                    ctx.fillText(row[key], cellX + 5, cellY + rowHeight / 2 + 5)
                })
            })
        }
    }
    // 屏幕放大缩小，重绘
    redraw() {}
    _initEl() {
        if (!this._el) {
            const canvas = document.createElement('canvas')
            canvas.width = this._containerEl.clientWidth
            canvas.height = this._containerEl.clientHeight
            this._containerEl.appendChild(canvas)

            this._el = canvas
        }
    }
    get context() {
        return this._el.getContext('2d')
    }
}
