import Plugin from '.'
import Canvas from '../shared/canvas'
import { Cell } from '../type'

// 表头渲染
export default class RenderHeaderPlugin extends Plugin {
    override apply() {
        const canvas: Canvas = this.canvas
        if (canvas) {
            const { headerBg } = this.store.getOptions()

            const cells = this._assembleCells()
            cells.forEach((cell) => {
                const { x, y, width, height, text } = cell
                // 绘制背景
                canvas.fillStyle = headerBg
                canvas.fillRect(x, y, width, height)

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
                canvas.font = '14px Arial'
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
        // 列头
        const columns = this.store.getColumns()

        const options = this.store.getOptions()
        const { defaultRowHeight, defaultCellWidth } = options
        let totolWidth = 0
        columns?.forEach((column) => {
            const { width, title } = column
            const val = title || ''

            // 计算单元格起始位置
            const cellX = totolWidth
            const cellY = 0

            // 列宽(根据用户传入的列宽信息、剩余列自适应计算列宽)
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

        return cells
    }
}
