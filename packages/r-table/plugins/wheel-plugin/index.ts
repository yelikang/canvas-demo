import Plugin from '..'
import Vue from 'vue'
import { CustomEvent } from '../../event'
import { debounce } from 'lodash-es'

// 滚轮滚动插件
export default class WheelPlugin extends Plugin {
    _vm: any
    wheelPos = { x: 0, y: 0 }
    override apply() {
        const canvasEl = this.canvas.element
        this._wheelScroll = this._wheelScroll.bind(this)
        canvasEl.addEventListener('mousewheel', this._wheelScroll)
    }
    _wheelScroll(_event: any) {
        this.wheelPos.x += _event.deltaX
        this.wheelPos.y += _event.deltaY
        if (this.wheelPos.x <= 0) {
            this.wheelPos.x = 0
        }
        if (this.wheelPos.y <= 0) {
            this.wheelPos.y = 0
        } else if (this.wheelPos.y > (this.fullSize.height - this.viewSize.height)) {
            // 滚动距离不能超过 实际高度 - 可视区域高度
            this.wheelPos.y = this.fullSize.height - this.viewSize.height
        }

        this.eventBus.emit(CustomEvent.SCROLLWHEEL, {
            scrollTop: this.wheelPos.y,
            scrollLeft: this.wheelPos.x
        })
    }
}
