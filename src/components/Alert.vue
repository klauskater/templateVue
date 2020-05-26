<template>
  <div>{alert}</div>
</template>
<script>
export default {
  name: "Alert",
  data(){
    return {
      alert: ""
    }
  },
  created() {
    this.$alertBus.$on("alert", this.Alert)
    this.$alertBus.$on("confirm", this.Confirm)
    this.$alertBus.$on("prompt", this.Prompt)
  },

  beforeDestroy(){
    this.$alertBus.$off("alert")
    this.$alertBus.$off("confirm")
    this.$alertBus.$off("prompt")
  },
  methods: {
    Alert(message){
      console.log(message)
    },
    Confirm(message){
      console.log(message)
    },
    Prompt(message){
      console.log(message)
    }
  }
}
</script>