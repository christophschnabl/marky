import Vue from 'vue'
import App from './App.vue'
import router from './router';
import VueSocketIO from 'vue-socket.io'
import UUID from 'vue-uuid';
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
}

Vue.config.productionTip = false

Vue.use(VueHtmlToPaper, options);
Vue.use(UUID);
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}));

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
