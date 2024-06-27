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
            const { scrollbarWidth } = this.options
            const { width, height } = this.fullSize

            const RenderConstructor = Vue.extend(View)
            this._vm = new RenderConstructor({
                el: document.createElement('div'),
                propsData: {
                    width: scrollbarWidth,
                    fullWidth: width,
                    fullHeight: height,
                    scroll: {
                        x: 0,
                        y: 0
                    }
                },
                methods: {
                    $_onScrollY: debounce(this._scrollY.bind(this)),
                    $_onScrollX: debounce(this._scrollX.bind(this))
                }
            })

            this.containerEl.appendChild(this._vm.$el)
        }
    }
    _scrollY(_event: Event) {
        const target = _event.target as HTMLElement
        const { scrollTop } = target
        this.eventBus.emit(CustomEvent.SCROLLBAR, {
            y: scrollTop
        })
    }
    _scrollX(_event: Event) {
        const target = _event.target as HTMLElement
        const { scrollLeft } = target
        this.eventBus.emit(CustomEvent.SCROLLBAR, {
            x: scrollLeft
        })
    }
    update() {
        const { x, y } = this.scrollSize

        this._vm.scroll = {
            x,
            y
        }
    }
}
