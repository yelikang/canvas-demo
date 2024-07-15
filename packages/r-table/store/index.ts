import mixinDecorator from '../shared/mixin'
import Canvas from '../shared/canvas'
import { RTableOption } from '../type'
import Width from './mixins/width'
import Data from './mixins/data'

const defaultOptions = {
    bg: '#fff',
    highlightBg: '#f5f5f5',
    headerBg: '#ecf1f5',
    // 行高
    defaultRowHeight: 40,
    // 边框颜色
    borderColor: '#dfdfdf',
    // 单元格宽度
    defaultCellWidth: 80,
    paddingWidth: 5,
    dragColor:'green'
}

@mixinDecorator([Width, Data])
export default class Store {
    // 索引签名
    [key: string]: any
    _datas: Array<any> = []
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
    // 操作主元素
    _mainEl: HTMLElement
    // 滚动数据
    _scroll = { x: 0, y: 0 }
    // 当前选中行
    _currRow: number
    // 列宽拖拽线位置
    _resizeLineX:number
    constructor(_options: RTableOption) {
        this._options = Object.assign({}, defaultOptions, _options)

        // canvas挂载
        const { containerEl } = this._options
        this._containerEl = containerEl
        this._containerEl.style.position = 'relative'

        this.setSize()
        this._containerEl.appendChild(this._canvas.element)

        // 创建表格主元素，挂载
        const rtableMainEl = document.createElement('div')
        this._mainEl = rtableMainEl
        rtableMainEl.className = 'r-table__main'
        this._containerEl.appendChild(rtableMainEl)
    }
    setSize() {
        // 先清空canvas的宽高，不然containerEl会被撑开
        this._canvas.setSize({ width: 0, height: 0 })

        let width = this._containerEl.clientWidth
        let height = this._containerEl.clientHeight

        this._viewSize = {
            width,
            height
        }

        this._canvas.setSize({ width, height })

        this._computeWidth()
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
    setCurrentRow(_row: number) {
        this._currRow = _row
    }
    /**
     * 设置列宽拖拽线位置
     */
    setResizeLine(_resizeLineX:number) {
        // 绘制竖线
        this._resizeLineX = _resizeLineX
    }
    getData() {
        // return this._datas
        return this._getViewData()
    }
    getColumns() {
        return this._options.columns
    }
    /**
     * 获取当前表格操作元素
     * @returns
     */
    getMainEl() {
        return this._mainEl
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
    getCurrRow() {
        return this._currRow
    }

    getOptions() {
        return this._options
    }
    getCanvas(): Canvas {
        return this._canvas
    }
    getResizeLine():number{
        return this._resizeLineX
    }
}
