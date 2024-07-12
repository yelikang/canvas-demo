import { Point } from '../type'

export default class Canvas {
    private _canvasEl: HTMLCanvasElement
    private _width: number
    private _height: number
    constructor() {
        this._canvasEl = document.createElement('canvas')
        this._canvasEl.style.border = `1px solid #dfdfdf`

        this._canvasEl.oncontextmenu = (e) => {
            e.preventDefault()
        }
    }
    setSize({ width, height }) {
        this._canvasEl.width = this._width = width
        this._canvasEl.height = this._height = height
    }
    get element() {
        return this._canvasEl
    }
    get width() {
        return this._width
    }
    get height() {
        return this._height
    }
    /**
     * 填充颜色/文本颜色
     */
    set fillStyle(val: string) {
        if (this.context) {
            this.context.fillStyle = val
        }
    }
    /**
     * 画笔颜色
     */
    set strokeStyle(val: string) {
        if (this.context) {
            this.context.strokeStyle = val
        }
    }
    /**
     * 字体样式
     */
    set font(val: string) {
        if (this.context) {
            this.context.font = val
        }
    }

    private get context() {
        return this._canvasEl.getContext('2d')
    }
    /**
     * 测量文本宽度
     * @param text
     * @returns
     */
    measureText(text: string, font: string = '14px Arial'): number {
        if (this.context) {
            this.context?.save()
            this.font = font
            const width = this.context.measureText(text).width || 0
            this.context.restore()
            return width
        }
        return 0
    }
    /**
     * 填充图形
     * @param x
     * @param y
     * @param width
     * @param height
     */
    fillRect(x, y, width, height, color?: string) {
        if (color) {
            this.context?.save()
            this.fillStyle = color
        }
        this.context?.fillRect(x, y, width, height)

        if (color) {
            this.context?.restore()
        }
    }
    /**
     * 绘制文字
     * @param text
     * @param x
     * @param y
     */
    fillText(text: string, x: number, y: number) {
        if (this.context) {
            this.context.fillText(text, x, y)
        }
    }

    /**
     * 画水平线
     * @param startPoint
     * @param endPoint
     */
    renderHorLine(startPoint: Point, endPoint: Point) {
        if (this.context) {
            this.context.beginPath()
            this.context.moveTo(startPoint.x, startPoint.y - 0.5)
            this.context.lineTo(endPoint.x, endPoint.y - 0.5)
            this.context.lineWidth = 1
            this.context.stroke()
            this.context.closePath()
        }
    }
    /**
     * 画垂直线
     * @param startPoint
     * @param endPoint
     */
    renderVerLine(startPoint: Point, endPoint: Point) {
        if (this.context) {
            this.context.beginPath()
            this.context.moveTo(startPoint.x - 0.5, startPoint.y)
            this.context.lineTo(endPoint.x - 0.5, endPoint.y)
            this.context.lineWidth = 1
            this.context.stroke()
            this.context.closePath()
        }
    }

    /**
     * 清空画布
     */
    clear() {
        this.context?.clearRect(0, 0, this.width, this.height)
    }
    ellipsis = '...'
    /**
     * 文本缩略
     */
    text2Ellipsis(text: string, maxWidth: number) {
        // 缩略符号长度
        const ellipsisLength = this.ellipsis.length

        // 先计算最大宽度下的最大文本内容
        let maxStr = ''
        let maxStrWidth = 0
        const textLength = text.length
        let i = 0
        while (i < textLength && maxStrWidth < maxWidth) {
            i++
            maxStr = text.substring(0, i)
            maxStrWidth = this.measureText(maxStr)
        }

        if (i === textLength && maxStrWidth <= maxWidth) {
            // 如果循环到了最后一个字符，并且长度还是小于等于最大长度，直接返回
            return maxStr
        } else {
            // 需要缩略，再加载缩略符下的最大内容...
            while (maxStrWidth + ellipsisLength > maxWidth) {
                // 往后减
                maxStr = maxStr.substring(0, i)
                maxStrWidth = this.measureText(maxStr)
                i--
            }

            return maxStr.substring(0, i) + this.ellipsis
        }
    }
}
