import Store from './store'
import Plugin from './plugins'
import RenderPlugin from './plugins/render-plugin'
import ScrollPlugin from './plugins/scroll-plugin'

import { PluginContext, RTableOption } from './type'
import RTableEvent, { CustomEvent } from './event'
import { noop } from './shared/utils'
import WheelPlugin from './plugins/wheel-plugin'
import ResizePlugin from './plugins/resize-plugin'

export default class RTable {
    _containerEl: HTMLElement
    _store: Store
    _plugins: Map<string, Plugin> = new Map()
    _event = new RTableEvent()
    constructor(_options: RTableOption) {
        this._store = new Store(_options)
        this._scrollBar = this._scrollBar.bind(this)
        this._scrollWheel = this._scrollWheel.bind(this)
        this._resize = this._resize.bind(this)
        
        this._event.on(CustomEvent.SCROLLBAR, this._scrollBar)
        this._event.on(CustomEvent.SCROLLWHEEL, this._scrollWheel)
        this._event.on(CustomEvent.RESIZE, this._resize)
    }
    setData(_data: Array<any>) {
        this._store.setData(_data)
        this._initPlugin()
    }
    // 屏幕放大缩小，重绘
    redraw() {
        this.getPlugin('RenderPlugin').apply()
    }
    _initPlugin() {
        // TODO: 根据不同的生命周期注册不同的插件(或者不同插件注册不同声明周期事件)
        this.registerPlugin(RenderPlugin)
        this.registerPlugin(ScrollPlugin)
        this.registerPlugin(WheelPlugin)
        this.registerPlugin(ResizePlugin)
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
    _scrollBar(position) {
        this._store.setScroll(position)
        // 重新绘制
        this.redraw()
        // 设置滚轮位置
        this.getPlugin('WheelPlugin').update()
    }
    _scrollWheel(position) {
        this._store.setScroll(position)
        // 重新绘制
        this.redraw()
        // 设置滚动条位置
        this.getPlugin('ScrollPlugin').update()
    }
    _resize(){
        this._store.setSize()
        this.redraw()
    }
}
