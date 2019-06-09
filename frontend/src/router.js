import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Document from './views/Document'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/documents/:id', component: Document}
]

export default new VueRouter({
    mode: 'history',
    routes: routes,
});
