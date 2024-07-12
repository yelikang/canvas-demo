import Plugin from '..'
import { CustomEvent } from '../../event'

// 行选择插件
export default class RowSelectPlugin extends Plugin {
    _currRow = -1
    override apply() {
        const mainEl = this.mainEl
        this._mouseMove = this._mouseMove.bind(this)
        mainEl.addEventListener('mousemove', this._mouseMove)
    }
    _mouseMove(_event: any) {
        const { clientX, clientY } = _event
        // 包裹元素的绝对定位
        const { left, top } = this.mainEl.getBoundingClientRect()

        const relativeX = clientX - left
        const relativeY = clientY - top

        if (relativeY > 0) {
            const { defaultRowHeight } = this.options
            if (relativeY < defaultRowHeight) {
                // 选中的是表头
                this._currRow = -1
                this.eventBus.emit(CustomEvent.ROWSELECT, -1)
            } else {
                // 选中的是表体，计算位置是第几行(减掉表头的高度/行高)
                const row = Math.floor(
                    (relativeY - defaultRowHeight) / defaultRowHeight
                )

                if (row !== this._currRow) {
                    this._currRow = row
                    this.eventBus.emit(CustomEvent.ROWSELECT, row)
                }
            }
        }
    }

    destroy() {}
}
