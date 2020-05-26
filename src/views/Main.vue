<template>
  <div>
    <div v-if="loading">Загрузка</div>
    <div class="container" v-else>
      <v-app-bar
        app
        color="primary"
        dark
      >
        Здравствуйте {{user.displayName}}
        <v-spacer></v-spacer>
        <v-btn text @click="signoutLocal">Выйти</v-btn>
    <!--    <div id="nav">-->
    <!--    </div>-->
      </v-app-bar>
        <p v-if="user.emailVerified">Ваша почта подтверждена</p>
        <p v-else>Вам необходимо <span @click="verified" class="link">подтвердить</span> почту</p>
      <router-view/>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex"

export default {
  name: "Main",
  data(){
    return {
      loading: true
    }
  },
  computed: {
    ...mapState(["autorise", "user"])
  },
  async mounted() {
    console.log("begin")
    const authorise = await this.checkAuth()
    console.log("authorise", authorise)
    if(!authorise)
      this.$router.push({name: "Authorization"})
    this.loading = false
  },
  methods: {
    ...mapActions(["verification", "checkAuth", "signout"]),
    verified(){
      this.verification()
      this.$snackbarBus.message("Подтверждение отправленно.")
    },
    signoutLocal(){
      this.signout()
      this.$router.push({name: "Authorization"})
    }
  }
}
</script>
<style lang="sass">
.link
  cursor: pointer
  color: aqua
</style>