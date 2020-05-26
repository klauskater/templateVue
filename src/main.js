import Vue from "vue"
import "./plugins/axios"
import "./plugins/snackbar"
import "./plugins/alert"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import * as firebase from "firebase"

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyDPzeJS9p8li3CaJZcz42pKZZFTiClWgjo",
  authDomain: "testtemplate-a9489.firebaseapp.com",
  databaseURL: "https://testtemplate-a9489.firebaseio.com",
  projectId: "testtemplate-a9489",
  storageBucket: "testtemplate-a9489.appspot.com",
  messagingSenderId: "875732667260",
  appId: "1:875732667260:web:0200e3b018dc0be60672f9"
}

firebase.initializeApp(configOptions)

store.$axios = Vue.axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
