import Plugin from "../plugins";


export default class RSheet {
    _plugins: Array<Plugin>
    constructor() {

    }

    registerPlugin(plugin: Plugin) {
        this._plugins.push(plugin)
    }
}
