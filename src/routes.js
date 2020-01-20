import home from './components/home.vue'
import senatedata from './components/senatedata.vue'
import housedata from './components/housedata.vue'
import senateattendance from './components/senateattendance.vue'
import houseattendance from './components/houseattendance.vue'
import senateparty from './components/senateparty.vue'
import houseparty from './components/houseparty.vue'

export default [
    { path: '/', component: home },
    { path: '/senatedata', component: senatedata},
    { path: '/housedata', component: housedata},
    { path: '/senateattendance', component: senateattendance},
    { path: '/houseattendance', component: houseattendance},
    { path: '/senateparty', component: senateparty},
    { path: '/houseparty', component: houseparty}
]