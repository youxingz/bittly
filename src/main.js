import Vue from 'vue'
import Vuex from 'vuex'
import VueShortkey from 'vue-shortkey'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import Dictionary from './utils/Dictionary.js';
import Store from './store/index.js'
import i18n from './i18n/index.js'
import VueThermometer from 'vuejs-thermometer'
import BittlyApiClient from './utils/BittlyApiClient';
import Logger from './utils/Logger.js'
import Environment from './environments/Environment.js';

/** 
 * setup env 
 * */
let env = Environment.setup();
Vue.prototype.$env = env;

/**
 * send log message to main process console
 * @param  {...any} messages 
 */
Vue.prototype.$appLog = ( ... messages ) => {
    let message = messages[0];
    for ( let i=1; i<messages.length; i++ ) {
        let item = messages[i];
        if ( 'object' === typeof(item) ) {
            item = JSON.stringify(item);
        }
        message = message.replace(`{${i-1}}`, item);
    }
    message = `[renderer] ${message}`;
    Environment.getEnv().log(message);
    console.log(message);
};

Vue.prototype.$eventBus = new Vue();
Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueShortkey)
Vue.use(Antd);
Vue.use(VueCodeMirror);
Vue.use(VueThermometer)

Logger.setupVue(Vue);
Dictionary.setupVue(Vue);
BittlyApiClient.setupVue(Vue);
window.app = new Vue({
    store : new Vuex.Store(Store),
    i18n,
    render: h => h(App),
}).$mount('#app')
