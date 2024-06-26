import { PluginContext } from '../type'
import RenderPlugin from './render-plugin'
import ScrollPlugin from './scroll-plugin'

export default class Plugin {
    constructor(private _context: PluginContext) {
        this._context = _context
    }

    get canvas() {
        return this._context.store.getCanvas()
    }

    get options() {
        return this._context.store.getOptions()
    }
    get datas() {
        return this._context.store.getData()
    }
    get columns() {
        return this._context.store.getColumns()
    }
    /**
     * 获取当前表格包裹元素
     */
    get containerEl() {
        return this._context.store.getContainerEl()
    }
    /**
     * 获取可视区域高度
     */
    get viewSize() {
        return this._context.store.getViewSize()
    }
    /**
     * 获取容器实际宽高
     */
    get fullSize() {
        return this._context.store.getFullSize()
    }

    get eventBus() {
        return this._context.event
    }
    apply() {
        throw Error(`Abstract method apply. Must be overridden.`)
    }
    update(any) {
        throw Error(`Abstract method update. Must be overridden.`)
    }
}
