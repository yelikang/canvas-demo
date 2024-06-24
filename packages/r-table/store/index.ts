import Canvas from '../shared/canvas'
import { RTableOption } from '../type'

const defaultOptions: RTableOption = {
    bg: '#fff',
    headerBg: '#ecf1f5',
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
    _hasCompute = false
    constructor() {}
    setData(_datas: Array<any>) {
        this._datas = _datas
    }
    getData() {
        return this._datas
    }
    getColumns(_canvas:Canvas) {
        // 计算列宽
        if (!this._hasCompute) {
            const { defaultCellWidth } = this._options
            this._options.columns?.forEach((col: any) => {
                const { width, title, key } = col
                switch (width) {
                    case undefined:
                        // 未指定宽度，设置为默认宽度
                        col.width = defaultCellWidth
                        break
                    case 'auto':
                        // 自适应列(获取当前列最宽内容)
                        let maxWidthText = title
                        this._datas.forEach(row=>{
                            if( _canvas.measureText(row[key]) > _canvas.measureText(maxWidthText)){
                                maxWidthText = row[key]
                            }
                        })
                        col.width = _canvas.measureText(maxWidthText)
                        break
                    default:
                        break
                }
            })
            this._hasCompute = true
        }

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
