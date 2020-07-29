import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from "./mixins/mixins";
import Router from 'vue-router';
import BaiduMap from 'vue-baidu-map';
const routerPush = Router.prototype.push;
// window.baseImgUrl = "http://www.mlxc365.com/images/sxccx/icon/";
window.baseImgUrl = "http://119.3.196.255:7604/images/iconPic/"
    // import vConsole from 'vconsole'
    // Axios.defaults.withCredentials = true;

// 移动端打印
// Vue.prototype.$vConsole = new vConsole()
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
Vue.mixin(mixins);
Vue.use(BaiduMap, {
    ak: 'LpxGe1xVTwhNcDStKuXjdMawhqXGsEZ5'
});
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');