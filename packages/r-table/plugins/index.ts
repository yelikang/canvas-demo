import { PluginContext } from '../type'

export default class Plugin {
    constructor(private _context: PluginContext) {
        this._context = _context
    }

    get canvas() {
        return this._context.canvas
    }
    get store() {
        return this._context.store
    }

    apply(){
        throw Error(`Abstract method apply. Must be overridden.`)
    }
}
