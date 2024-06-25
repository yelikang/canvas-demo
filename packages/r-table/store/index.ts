import RTable from '..'
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
    _datas: Array<any> = []
    _columns: Array<any> = []
    _options: RTableOption
    _hasCompute = false
    _canvas = new Canvas()
    _width: number
    _height: number
    constructor() {}
    setSize({ width, height }) {
        this._width = width
        this._height = height
        this._canvas.setSize({ width, height })
    }
    setData(_datas: Array<any>) {
        this._datas = _datas
    }
    getData() {
        return this._datas
    }
    getColumns() {
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
                        this._datas.forEach((row) => {
                            if (
                                this._canvas.measureText(row[key]) >
                                this._canvas.measureText(maxWidthText)
                            ) {
                                maxWidthText = row[key]
                            }
                        })
                        // 文字前面偏移了5px、后面再偏移5px
                        col.width = this._canvas.measureText(maxWidthText) + 5 + 5
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
    getViewData() {
        //  可视数据计算
        // 起始行 向上滚动条距离/ 每个单元格高度  向下取整 = 滚动了多少行
        // var startY = Math.floor(scroll.y / cellHeight);
        // 结束行  (滚动条高度+视口高度) / 每个单元格高度 向上取整
        // var endY = Math.min(
        //   Math.ceil((scroll.y + viewportHeight) / cellHeight),
        //   tableData.length
        // );
        // 或者计算可视区域能容显示多少条数据   起始+条数
    }
    setOptions(_options: RTableOption) {
        this._options = Object.assign({}, defaultOptions, _options)
    }
    getOptions() {
        return this._options
    }
    getCanvas(): Canvas {
        return this._canvas
    }
}
