import Vue from "vue"

const bus = new Vue()

// bus.$on("alert", this.alert("alert"))
// bus.$on("confirm", this.alert("confirm"))
// bus.$on("prompt", this.alert("prompt"))

Vue.$alertBus = bus