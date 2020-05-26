<template>
  <v-app>
    <Snackbar />
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar"

export default {
  name: "App",
  components: {
    Snackbar
  },
  data: () => ({}),
}
</script>
