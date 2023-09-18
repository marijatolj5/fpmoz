import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:Home
  },
  {
    path:'/vijesti',
    name:'News',
    component: () =>
      import(
       "../views/News.vue"
      )
  },
 
  {
    path: "/korisnici",
    name: "User",
    component: () =>
      import(
       "../views/Users.vue"
      )
  },
  {
    path: '*',
    name: '404',
    component:Home
  },

]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {

  next();
});

export default router

