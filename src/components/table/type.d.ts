type RTableOption = {
    bg: string // 背景色
    rowHeight: number // 行高
    borderColor: string
}

type RTableParams = {
    containerEl: HTMLCanvasElement // 渲染在哪个元素中
    options: RTableOption // 其它参数
}
