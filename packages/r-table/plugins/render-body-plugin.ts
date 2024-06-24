// 表体渲染

import Plugin from '.'
import Canvas from '../shared/canvas'
import { Cell } from '../type'

export default class RenderBodyPluin extends Plugin {
    override apply() {
        const canvas: Canvas = this.canvas
        if (canvas) {
            const width = canvas.width
            const height = canvas.height

            const { bg, borderColor } = this.store.getOptions()
            // 清空画布
            canvas.clear()
            // 填充背景颜色
            canvas.fillStyle = bg
            // 填充整个画布
            canvas.fillRect(0, 0, width, height)

            canvas.strokeStyle = borderColor

            const cells = this._assembleCells()
            cells.forEach((cell) => {
                const { x, y, width, height, text } = cell
                // 下边框
                const startPoint = {
                    x,
                    y: y + height
                }
                const endPoint = {
                    x: x + width,
                    y: y + height
                }
                canvas.renderHorLine(startPoint, endPoint)

                // 右边框
                const startPoint2 = {
                    x: x + width,
                    y: y
                }

                const endPoint2 = {
                    x: x + width,
                    y: y + height
                }
                canvas.renderVerLine(startPoint2, endPoint2)

                // =============   文本绘制
                // 文本颜色
                canvas.fillStyle = '#000'
                // 字体样式
                canvas.font = '12px Arial'
                canvas.fillText(text, x + 5, y + height / 2 + 5)
            })
        }
    }
    /**
     * 组装单元格
     * @returns
     */
    private _assembleCells(): Array<Cell> {
        const cells: Array<Cell> = []
        // 数据(实际应该用可视区域数据)
        const datas = this.store.getData()
        // 列头
        const columns = this.store.getColumns(this.canvas)

        const options = this.store.getOptions()
        const { defaultRowHeight, defaultCellWidth } = options
        datas.forEach((row, rowIndex) => {
            let totolWidth = 0
            columns?.forEach((column, colIndex) => {
                const { key, width } = column
                const val = row[key] || ''

                // 计算单元格起始位置
                const cellX = totolWidth
                const cellY = (rowIndex + 1) * defaultRowHeight

                // 列宽(根据用户传入的列宽信息、剩余列自适应计算列宽)
                // 1.自适应(内容自适应) + 默认列宽
                // 2.用户传入列宽
                // a. 不传入宽度，使用默认宽度，计算当前能显示多少个列
                // b. 传入宽度，设置最小宽度，计算剩余列宽
                // c. 根据文字内容，计算宽度
                // d. 超出显示...，不换行
                const colWidth = width || defaultCellWidth

                totolWidth = totolWidth + colWidth

                const cell: Cell = {
                    x: cellX,
                    y: cellY,
                    // 列宽
                    width: colWidth,
                    // 行高
                    height: defaultRowHeight,
                    text: val
                }
                cells.push(cell)
            })
        })

        return cells
    }
}
