import { Point } from '../type'

export default class Canvas {
    private _canvasEl: HTMLCanvasElement
    private _width: number
    private _height: number
    constructor() {
        this._canvasEl = document.createElement('canvas')
        this._canvasEl.style.border = `1px solid #dfdfdf`
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
    // 填充颜色/文本颜色
    set fillStyle(val: string) {
        if (this.context) {
            this.context.fillStyle = val
        }
    }
    // 画笔颜色
    set strokeStyle(val: string) {
        if (this.context) {
            this.context.strokeStyle = val
        }
    }
    // 字体样式
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
    measureText(text:string):number{
        return this.context?.measureText(text).width || 0
    }
    /**
     * 填充图形
     * @param x 
     * @param y 
     * @param width 
     * @param height 
     */
    fillRect(x, y, width, height) {
        this.context?.fillRect(x, y, width, height)
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
     * 清空画布
     */
    clear() {
        this.context?.clearRect(0, 0, this.width, this.height)
    }
}
