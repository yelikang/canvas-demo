import RenderHeaderPlugin from './plugins/render-header-plugin'
import RenderBodyPlugin from './plugins/render-body-plugin'
import Store from './store'
import Plugin from './plugins'
import { PluginContext, RTableOption, RTableParams } from './type'

export default class RTable {
    _containerEl: HTMLElement
    _store:Store
    _plugins: Array<Plugin> = []
    constructor(_params: RTableParams) {
        const { containerEl, options } = _params
        this._containerEl = containerEl
        const { clientWidth, clientHeight } = containerEl
        const store = new Store(options)

        store.setSize({ width: clientWidth, height: clientHeight })
        this._containerEl.appendChild(store._canvas.element)

        this._store = store
    }
    setData(_data: Array<any>) {
        this._store.setData(_data)
        this._initPlugin()
    }
    // 屏幕放大缩小，重绘
    redraw() {}
    _initPlugin() {
        this.registerPlugin(RenderBodyPlugin)
        this.registerPlugin(RenderHeaderPlugin)
    }

    registerPlugin(_PluginCtor: any) {
        const context: PluginContext = {
            store: this._store
        }
        const pluginInstance = new _PluginCtor(context)
        pluginInstance.apply()

        this._plugins.push(pluginInstance)
    }
}
