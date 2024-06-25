import { PluginContext } from '../type'

export default class Plugin {
    constructor(private _context: PluginContext) {
        this._context = _context
    }

    get canvas() {
        return this._context.store.getCanvas()
    }

    get options(){
        return this._context.store.getOptions()
    }
    get datas(){
        return this._context.store.getData()
    }
    get columns(){
        return this._context.store.getColumns()
    }
    apply(){
        throw Error(`Abstract method apply. Must be overridden.`)
    }
}
