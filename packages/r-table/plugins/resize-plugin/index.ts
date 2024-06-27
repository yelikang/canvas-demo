import Plugin from '..'
import { CustomEvent } from '../../event'

// 尺寸变更插件
export default class ResizePlugin extends Plugin {
    _resizeObserver: ResizeObserver
    override apply() {
        // this._resizeObserver = new ResizeObserver(this._resize.bind(this))
        // this._resizeObserver.observe(this.containerEl)

        this._resize = this._resize.bind(this)
        window.addEventListener('resize', this._resize.bind(this))
    }
    _resize(_event: any) {
        this.eventBus.emit(CustomEvent.RESIZE)
    }
    update() {}
    destroy() {
        window.removeEventListener('resize', this._resize)
    }
}
