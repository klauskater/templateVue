import Vue from "vue"

const bus = new Vue()

bus.message = (message) => bus.$emit("message", message)
bus.error = (message) => bus.$emit("message", message, "error")
bus.warning = (message) => bus.$emit("message", message, "warning")

Vue.prototype.$snackbarBus = bus