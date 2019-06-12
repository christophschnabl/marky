import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Document from './views/Document'
import LastDocuments from './views/LastDocuments'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/documents/:id', component: Document},
    { path: '/documents', component: LastDocuments}
]

export default new VueRouter({
    mode: 'history',
    routes: routes,
});
