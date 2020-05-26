<template>
  <v-snackbar
    v-model="snackbar"
    :color="color"
    :timeout="3000"
    top
  >
    {{ message }}
    <v-btn
      dark
      text
      @click="snackbar = false"
    >
      Закрыть
    </v-btn>
  </v-snackbar>
</template>
<script>
  export default {
    name: "Alert",
    data(){
      return {
        message: "",
        snackbar: false,
        color: "info"
      }
    },
    created() {
      this.$snackbarBus.$on("message", this.Message)
    },

    beforeDestroy(){
      this.$snackbarBus.$off("message")
    },
    methods: {
      Message(message, type="info"){
        this.color = type
        this.message = message
        this.snackbar = true
      }
    }
  }
</script>