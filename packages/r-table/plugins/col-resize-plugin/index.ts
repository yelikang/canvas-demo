import Plugin from '..'
import { CustomEvent } from '../../event'
import { throttle } from 'lodash-es'

/**
 * 是否在边框的边界
 * @param columns
 * @param positionX
 * @returns
 */
const ifOnColumnBorder = (columns: Array<any>, positionX: number) => {
    // 累计宽度
    let accPositionX = 0
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        accPositionX += column.computeWidth
        // 边框左右5px位置
        if (Math.abs(accPositionX - positionX) < 5) {
            return {
                // 拖拽到的最小x轴位置
                minX: accPositionX - column.computeWidth,
                colIndex: i
            }
        }
    }

    return {
        minX: accPositionX,
        colIndex: -1
    }
}

// 列宽拖拽插件
export default class ColResizePlugin extends Plugin {
    _isDraging = false
    _dragCol = -1
    // 拖拽X轴最小位置
    _minX = 0
    // 起始拖拽位置
    _dragStart = 0
    // 结束拖拽位置
    _dragEnd = 0
    override apply() {
        this._mouseDown = this._mouseDown.bind(this)
        this._mouseMove = throttle(this._mouseMove.bind(this))
        this._mouseUp = this._mouseUp.bind(this)
        this.mainEl.addEventListener('mousedown', this._mouseDown)
        document.body.addEventListener('mousemove', this._mouseMove)
        document.body.addEventListener('mouseup', this._mouseUp)
    }
    _mouseDown(_event: MouseEvent) {
        const { colIndex, minX } = ifOnColumnBorder(
            this.columns,
            _event.offsetX
        )
        if (colIndex > -1) {
            const { defaultCellWidth } = this.options
            this._isDraging = true
            this._dragCol = colIndex
            this._minX = minX + defaultCellWidth
            this._dragStart = _event.offsetX
        }
    }
    _mouseMove(_event: MouseEvent) {
        const { offsetX } = _event
        if (!this._isDraging) {
            const { colIndex, minX } = ifOnColumnBorder(this.columns, offsetX)
            // 没有拖拽，是否在边框边界(显示拖拽图标)
            if (colIndex > -1) {
                document.body.style.cursor = 'col-resize'
            } else {
                document.body.style.cursor = 'default'
            }
        } else {
            // 鼠标按下，正在进行拖拽
            // 1.绘制拖拽线位置(位置不能小于当前列的位置)
            if (offsetX > this._minX) {
                const { parentElement } = _event.target
                const parentScrollX = parentElement.scrollLeft
                console.log('ffsetX - parentScrollX', offsetX - parentScrollX)
                this.eventBus.emit(
                    CustomEvent.COLRESIZE,
                    offsetX - parentScrollX,
                    false
                )

                // 2.记录列宽度，鼠标释放时绘制最新宽度
                this._dragEnd = offsetX
            }
        }
    }
    _mouseUp(_event: MouseEvent) {
        if (this._isDraging) {
            const diffWidth = this._dragEnd - this._dragStart
            const col: any = this.columns[this._dragCol]
            let width = col.computeWidth + diffWidth

            const { defaultCellWidth } = this.options

            width = width > defaultCellWidth ? width : defaultCellWidth

            col.width = width
            console.log('col.width', col, col.width)

            this._isDraging = false
            this._dragCol = -1
            this._minX = 0
            this._dragStart = 0

            this.eventBus.emit(CustomEvent.COLRESIZE, -1, true)
        }
    }

    destroy() {}
}
