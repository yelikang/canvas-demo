import Store from './store'
import Plugin from './plugins'
import RenderPlugin from './plugins/render-plugin'
import ScrollPlugin from './plugins/scroll-plugin'
import ResizePlugin from './plugins/resize-plugin'
import RowSelectPlugin from './plugins/row-select-plugin'

import { PluginContext, RTableOption } from './type'
import RTableEvent, { CustomEvent } from './event'
import { noop } from './shared/utils'
import './style/index.less'
export default class RTable {
    _containerEl: HTMLElement
    _store: Store
    _plugins: Map<string, Plugin> = new Map()
    _event = new RTableEvent()
    constructor(_options: RTableOption) {
        this._store = new Store(_options)
        this._scrollBar = this._scrollBar.bind(this)
        this._resize = this._resize.bind(this)
        this._selectRow = this._selectRow.bind(this)

        this._event.on(CustomEvent.SCROLLBAR, this._scrollBar)
        this._event.on(CustomEvent.RESIZE, this._resize)
        this._event.on(CustomEvent.ROWSELECT, this._selectRow)
    }
    setData(_data: Array<any>) {
        this._store.setData(_data)
        this._initPlugin()
    }
    // 屏幕放大缩小，重绘
    redraw() {
        this.getPlugin('RenderPlugin').apply()
    }

    registerPlugin(_PluginCtor: any) {
        const context: PluginContext = {
            store: this._store,
            event: this._event
        }
        const pluginInstance = new _PluginCtor(context)
        pluginInstance.apply()

        this._plugins.set(_PluginCtor.name, pluginInstance)
    }
    getPlugin(_pluginName: string) {
        return this._plugins.get(_pluginName) || { apply: noop, update: noop }
    }
    destroy() {
        this._plugins.forEach((_plugin) => {
            _plugin.destroy && _plugin.destroy()
        })
    }
    _initPlugin() {
        // TODO: 根据不同的生命周期注册不同的插件(或者不同插件注册不同生命周期事件)
        this.registerPlugin(RenderPlugin)
        this.registerPlugin(ScrollPlugin)
        this.registerPlugin(ResizePlugin)
        this.registerPlugin(RowSelectPlugin)
    }
    _scrollBar(position) {
        this._store.setScroll(position)
        // 重新绘制
        this.redraw()
    }
    _resize() {
        this._store.setSize()
        this.redraw()
        this.getPlugin('ScrollPlugin').update()
    }
    _selectRow(_row:number){
        this._store.setCurrentRow(_row)
        this.redraw()
    }
}
