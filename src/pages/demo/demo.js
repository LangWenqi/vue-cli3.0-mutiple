import Vue from 'vue'
import '@/common/js/transfer.js'
import Index from './demo.vue'
Vue.config.productionTip = false
new Vue({
    el: '#app',
    components: { Index },
    render:h=>h(Index)
});
