import RTable from '..'
import Canvas from '../shared/canvas'
import { RTableOption } from '../type'

const defaultOptions = {
    bg: '#fff',
    headerBg: '#ecf1f5',
    // 行高
    defaultRowHeight: 40,
    // 边框颜色
    borderColor: '#dfdfdf',
    // 单元格宽度
    defaultCellWidth: 80,
    paddingWidth:5
}

export default class Store {
    _datas: Array<any> = []
    _columns: Array<any> = []
    _options: RTableOption
    _canvas = new Canvas()
    // 可视区域宽高
    _viewSize = {
        width: 0,
        height: 0
    }
    // 实际宽高
    _fullSize = {
        width: 0,
        height: 0
    }
    // canvas包裹元素
    _containerEl: HTMLElement
    // 滚动数据
    _scroll = { x: 0, y: 0 }
    constructor(_options: RTableOption) {
        this._options = Object.assign({}, defaultOptions, _options)

        // canvas挂载
        const { containerEl } = this._options
        this._containerEl = containerEl
        this._containerEl.style.position = 'relative'

        this.setSize()
        this._containerEl.appendChild(this._canvas.element)
    }
    setSize() {
        // 先清空canvas的宽高，不然containerEl会被撑开
        this._canvas.setSize({ width:0, height:0 })

        let width = this._containerEl.clientWidth
        let height = this._containerEl.clientHeight


        this._viewSize = {
            width,
            height
        }

        this._canvas.setSize({ width, height })
    }
    setData(_datas: Array<any>) {
        const { defaultRowHeight } = this._options

        this._datas = _datas
        this._computeWidth()

        // 实际整体宽高
        this._fullSize = {
            width:
                this._options.columns?.reduce((acc, col: any) => {
                    return col?.width + acc
                }, 0) || 0,
            // 数据高度 + 头部高度
            height: this._datas.length * defaultRowHeight + defaultRowHeight
        }
    }
    /**
     * 设置滚动条信息
     */
    setScroll(_scroll: { x: number; y: number }) {
        if (_scroll.x !== undefined) {
            this._scroll.x = _scroll.x
        }
        if (_scroll.y !== undefined) {
            this._scroll.y = _scroll.y
        }
    }
    getData() {
        // return this._datas
        return this._getViewData()
    }
    getColumns() {
        return this._options.columns
    }
    /**
     * 获取当前表格的包裹元素
     * @returns
     */
    getContainerEl() {
        return this._containerEl
    }
    getViewSize() {
        return this._viewSize
    }

    getFullSize() {
        return this._fullSize
    }
    getScroll() {
        return this._scroll
    }
    // 获取可视区域数据(滚动加载)
    _getViewData() {
        const { defaultRowHeight } = this._options
        const { height } = this._viewSize
        const startRow = Math.floor(this._scroll.y / defaultRowHeight)

        const endRow = Math.ceil((this._scroll.y + height) / defaultRowHeight)

        const viewData = this._datas.slice(startRow, endRow)
        // 标识行实际索引
        viewData.forEach((row, index) => {
            row.rowIndex = startRow + index
        })

        return viewData
    }
    getOptions() {
        return this._options
    }
    getCanvas(): Canvas {
        return this._canvas
    }
    /**
     * 计算列宽
     */
    _computeWidth() {
        const { defaultCellWidth, paddingWidth } = this._options
        const measureText = this._canvas.measureText.bind(this._canvas)
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
                        if (measureText(row[key]) > measureText(maxWidthText)) {
                            maxWidthText = row[key]
                        }
                    })
                    // 文字前后偏移
                    col.width = measureText(maxWidthText) + paddingWidth * 2
                    break
                default:
                    col.width = +width
                    break
            }
        })
    }
}
