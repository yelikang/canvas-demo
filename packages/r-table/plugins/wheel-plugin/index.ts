import Plugin from '..'
import { CustomEvent } from '../../event'

// 滚轮滚动插件
export default class WheelPlugin extends Plugin {
    wheelPos = { x: 0, y: 0 }
    override apply() {
        const canvasEl = this.canvas.element
        this._wheelScroll = this._wheelScroll.bind(this)
        canvasEl.addEventListener('mousewheel', this._wheelScroll)
    }
    _wheelScroll(_event: any) {
        this.wheelPos.x += _event.deltaX
        this.wheelPos.y += _event.deltaY
        if (this.wheelPos.x > this.fullSize.width - this.viewSize.width) {
            // 滚动距离不能超过 实际高度 - 可视区域高度

            this.wheelPos.x = this.fullSize.width - this.viewSize.width
        }

        if (this.wheelPos.x <= 0) {
            this.wheelPos.x = 0
        }

        if (this.wheelPos.y > this.fullSize.height - this.viewSize.height) {
            // 滚动距离不能超过 实际高度 - 可视区域高度
            this.wheelPos.y = this.fullSize.height - this.viewSize.height
        }

        if (this.wheelPos.y <= 0) {
            this.wheelPos.y = 0
        }

        this.eventBus.emit(CustomEvent.SCROLLWHEEL, {
            y: this.wheelPos.y,
            x: this.wheelPos.x
        })
    }
    update() {
        const { x, y } = this.scrollSize
        if (x !== undefined) {
            this.wheelPos.x = x
        }
        if (y !== undefined) {
            this.wheelPos.y = y
        }
    }
}
