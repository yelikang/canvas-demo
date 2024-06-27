import Plugin from '..'
import Vue from 'vue'
import View from './view.vue'
import { CustomEvent } from '../../event'
import { debounce } from 'lodash-es'

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
                },
                methods: {
                    $_onScroll: debounce(this._scroll.bind(this))
                }
            })

            this.containerEl.appendChild(this._vm.$el)
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

    update() {}
}
