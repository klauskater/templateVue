import Vue from "vue"
import VueRouter from "vue-router"
import P404 from "../views/P404"

Vue.use(VueRouter)

const routes = [
  {
    path: "/registration",
    name: "Registration",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Registration.vue")
  },
  {
    path: "/authorization",
    name: "Authorization",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Authorization.vue")
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: () => import(/* webpackChunkName: "auth" */ "../views/RecoveryForm.vue"),
  },
  {
    path: "/",
    name: "Main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
    // children: {}
  },
  {
    path: "*",
    component: P404
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
