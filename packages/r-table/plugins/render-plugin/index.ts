import Plugin from '..'
import Canvas from '../../shared/canvas'
import { Cell } from '../../type'

// 绘制插件
export default class RenderPlugin extends Plugin {
    override apply() {
        const canvas: Canvas = this.canvas
        if (canvas) {
            const width = canvas.width
            const height = canvas.height

            const { bg, borderColor } = this.options
            // 清空画布
            canvas.clear()
            // 填充背景颜色
            canvas.fillStyle = bg
            // 填充整个画布
            canvas.fillRect(0, 0, width, height)

            canvas.strokeStyle = borderColor

            const { bodyCells, headerCells } = this._assembleCells()
            bodyCells.forEach((cell) => {
                this._renderCell(cell)
            })
            headerCells.forEach((cell) => {
                this._renderCell(cell)
            })
        }
    }
    /**
     * 组装单元格
     * @returns
     */
    private _assembleCells() {
        const bodyCells: Array<Cell> = []
        const headerCells: Array<Cell> = []
        // 数据(实际应该用可视区域数据)
        const datas = this.datas
        // 列头
        const columns = this.columns

        const options = this.options
        const { defaultRowHeight, defaultCellWidth } = options
        datas.forEach((row, rowIndex) => {
            let totolWidth = 0
            columns?.forEach((column, colIndex) => {
                const { key, width, title } = column
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
                bodyCells.push(cell)

                if (rowIndex === 0) {
                    const cell: Cell = {
                        x: cellX,
                        y: 0,
                        // 列宽
                        width: colWidth,
                        // 行高
                        height: defaultRowHeight,
                        text: title
                    }
                    headerCells.push(cell)
                }
            })
        })

        return {
            bodyCells,
            headerCells
        }
    }

    private _renderCell(_cell: Cell) {
        const canvas: Canvas = this.canvas

        let { x, y, width, height, text } = _cell
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

        // 内容超过宽度
        if (canvas.measureText(text) > width) {
            while (canvas.measureText(text) > width) {
                text = text.substring(0, text.length - 1)
            }
            // 截取掉两个字符，使用...替换
            text = text.substring(0, text.length - 2)
            text = text + '...'
        }

        canvas.fillText(text, x + 5, y + height / 2 + 5)
    }
}