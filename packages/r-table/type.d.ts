import Canvas from './shared/canvas'
import Store from './store'

type RTableOption = {
    bg: string // 背景色
    headerBg: string // 表头背景色
    defaultRowHeight: number // 行高
    borderColor: string
    columns?: [] // 列信息
    defaultCellWidth: number // 单元格宽度
}

type RTableParams = {
    containerEl: HTMLCanvasElement // 渲染在哪个元素中
    options: RTableOption // 其它参数
}

type Point = {
    x: number // x轴
    y: number // y轴
}

// 插件上下文
type PluginContext = {
    canvas: Canvas
    store: Store
}

// 单元格
type Cell = {
    x: number // x轴定位
    y: number // y轴定位
    width: number // 宽度
    height: number // 高度
    text: string // 文字
}
