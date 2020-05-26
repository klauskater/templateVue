import Vue from "vue"
import Vuex from "vuex"
// import firebase from "firebase"
import firebase from "firebase/app"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    autorise: false,
    user: {
      displayName: "",
      emailVerified: false
    }
  },
  mutations: {
    setAuth(state, auth){
      state.autorise = auth
    },
    setUser(state, user){
      state.user = user
    }
  },
  actions: {
    async checkAuth({commit}){
      return await new Promise(function(resolve, reject) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            resolve(user)
          } else {
            reject(new Error("No user"))
          }
        })
      }).then(user => {
        const tmpUser = {
          displayName: user.displayName,
          emailVerified: user.emailVerified
        }
        commit("setUser", tmpUser)
        return true
      }).catch(()=> false)
    },
    verification(){
      const fbase = firebase.auth()
      if(fbase.currentUser)
        fbase.currentUser.sendEmailVerification()
    },
    async registration(_ , {email, pass, name, surname}){
      const fbase = firebase.auth()
      const data = await fbase.createUserWithEmailAndPassword(email, pass)
      data.user.sendEmailVerification()
      data.user.updateProfile({
        displayName: `${name} ${surname}`
      })
      console.log("registration", email, pass, name, surname)
    },
    async authorisation({ commit }, {email, pass}){
      const fbase = firebase.auth()
      await fbase.signInWithEmailAndPassword(email, pass)

      const tmpUser = {
        displayName: fbase.currentUser.displayName,
        emailVerified: fbase.currentUser.emailVerified
      }
      commit("setAuth", true)
      commit("setUser", tmpUser)
      console.log("authorisation", email, pass)
    },
    async recovery(_, email){
      const fbase = firebase.auth()
      fbase.sendPasswordResetEmail(email)
      console.log("recovery", email)
    },
    signout(){
      firebase.auth().signOut()
    }
  },
  modules: {}
})
