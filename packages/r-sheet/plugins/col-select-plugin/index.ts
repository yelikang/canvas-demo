import Plugin from '../../../r-table/plugins'
import Vue from 'vue'
import View from './view.vue'

// 列选中插件
export default class ColSelectPlugin extends Plugin {
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
            this.mainEl.appendChild(this._vm.$el)
        }
    }
    _scroll(_event: Event) {
      
    }

    update() {}
}
