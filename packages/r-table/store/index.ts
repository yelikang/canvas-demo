import { RTableOption } from '../type'

const defaultOptions: RTableOption = {
    bg: '#fff',
    headerBg:'#ecf1f5',
    // 行高
    defaultRowHeight: 30,
    // 边框颜色
    borderColor: '#dfdfdf',
    // 单元格宽度
    defaultCellWidth: 80
}

export default class Store {
    _datas: Array<any>
    _columns: Array<any> = []
    _options: RTableOption
    constructor() {}
    setData(_datas: Array<any>) {
        this._datas = _datas
    }
    getData() {
        return this._datas
    }
    getColumns() {
        return this._options.columns
    }
    // 获取可视区域数据(滚动加载)
    getViewData() {}
    setOptions(_options: RTableOption) {
        this._options = Object.assign({}, defaultOptions, _options)
    }
    getOptions() {
        return this._options
    }
}
