<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            flat
          >
            <v-toolbar-title>Авторизация</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-form
            @submit.prevent="submit"
            v-model="valid"
            ref="form"
            lazy-validation
          >
            <v-card-text>
              <v-text-field
                v-model="user.email"
                label="Email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                v-model="user.pass"
                label="Пароль"
                type="password"
                :rules="[rules.required, rules.password]"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="goTo('/recovery')">Забыли пароль?</v-btn>
              <v-btn @click="goTo('/registration')">Регистрация</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" :disabled="iswait">Авторизоваться</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import {statuses} from "../utils/statuses"
  import {rules} from "../utils/formRules"
  import {mapActions} from "vuex"
  export default {
    name: "Registration",
    data(){
      return {
        status: statuses.READY,
        valid: true,
        user: {
          email: "",
          pass: "",
        },
        rules
      }
    },
    computed: {
      iswait(){
        return this.status !== statuses.READY
      },
    },
    watch:{
      user: {
        handler(){
          if(this.status === statuses.ERROR)
            this.status = statuses.READY
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(["authorisation"]),
      async submit(){
        if(!this.valid) return
        this.status = statuses.WAIT
        try {
          await this.authorisation(this.user)
          this.status = statuses.READY
          this.$router.push("/")
        } catch (e) {
          this.$snackbarBus.error(`Извините, произошла ошибка. ${e.message || e}`)
          this.status = statuses.ERROR
        }
      },
      goTo(path){
        this.$router.push({ path })
      }
    }
  }
</script>