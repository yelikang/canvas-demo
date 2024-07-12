import Plugin from '..'
import Vue from 'vue'
import View from './view.vue'
import { CustomEvent } from '../../event'
import { throttle } from 'lodash-es'

// 表格滚动插件
export default class ScrollPlugin extends Plugin {
    _vm: any
    override apply() {
        if (!this._vm) {
            const { width, height } = this.fullSize

            const RenderConstructor = Vue.extend(View)
            this._vm = new RenderConstructor({
                el: document.createElement('div'),
                propsData: {
                    fullWidth: width,
                    fullHeight: height
                }
            })
            // 添加元素撑开滚动条
            this.mainEl.appendChild(this._vm.$el)

            this._scroll = throttle(this._scroll.bind(this))
            this.mainEl.addEventListener('scroll', this._scroll)
        }
    }
    _scroll(_event: Event) {
        const target = _event.target as HTMLElement
        const { scrollTop, scrollLeft } = target
        this.eventBus.emit(CustomEvent.SCROLLBAR, {
            y: scrollTop,
            x: scrollLeft
        })
    }

    override update() {
        const { width, height } = this.fullSize
        this._vm.fullWidth = width
        this._vm.fullHeight = height
    }
}
