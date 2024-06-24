import RenderHeaderPlugin from './plugins/render-header-plugin'
import RenderBodyPlugin from './plugins/render-body-plugin'
import Canvas from './shared/canvas'
import Store from './store'
import Plugin from './plugins'
import { PluginContext, RTableOption, RTableParams } from './type'



export default class RTable {
    _containerEl: HTMLElement
    _canvas: Canvas
    _store = new Store()
    _plugins: Array<Plugin> = []
    constructor(_params: RTableParams) {
        const { containerEl, options } = _params
        this._containerEl = containerEl
        this._store.setOptions(options)
    }
    setData(_data: Array<any>) {
        this._store.setData(_data)
        this._init()
    }
    // 屏幕放大缩小，重绘
    redraw() {}
    _init() {
        if (!this._canvas) {
            const width = this._containerEl.clientWidth
            const height = this._containerEl.clientHeight

            const canvas = new Canvas()
            canvas.setSize({ width, height })
            this._canvas = canvas

            this._containerEl.appendChild(canvas.element)

            this.registerPlugin(RenderBodyPlugin)
            this.registerPlugin(RenderHeaderPlugin)
        }
    }

    registerPlugin(_PluginCtor: any) {
        const context: PluginContext = {
            canvas: this._canvas,
            store: this._store
        }
        const pluginInstance = new _PluginCtor(context)
        pluginInstance.apply()

        this._plugins.push(pluginInstance)
    }
}
