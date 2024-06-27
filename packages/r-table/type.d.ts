import RTableEvent from './event'
import Canvas from './shared/canvas'
import Store from './store'

type RTableOption = {
    containerEl: HTMLCanvasElement // 渲染在哪个元素中
    bg: string // 背景色
    headerBg: string // 表头背景色
    defaultRowHeight: number // 行高
    borderColor: string
    columns?: [] // 列信息
    defaultCellWidth: number // 单元格宽度
    paddingWidth:number // 文字左右间距
}

type Point = {
    x: number // x轴
    y: number // y轴
}

// 插件上下文
type PluginContext = {
    store: Store
    event: RTableEvent
}

// 单元格
type Cell = {
    x: number // x轴定位
    y: number // y轴定位
    width: number // 宽度
    height: number // 高度
    text: string // 文字
}
