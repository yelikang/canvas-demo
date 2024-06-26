import EventEmitter from 'eventemitter3'
export * from './enum'

export default class RTableEvent {
    _eventBus = new EventEmitter()
    constructor() {}
    on(type: string, fn: (any) => any, context?: any) {
        this._eventBus.on(type, fn, context)
    }
    emit(type: string, ...args: any[]) {
        this._eventBus.emit(type, ...args)
    }
    off(type: string) {
        this._eventBus.off(type)
    }
}
