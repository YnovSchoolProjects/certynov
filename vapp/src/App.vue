<template>
  <div v-if="isInitialized" id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <div class="section">
      <h2>Simple Storage</h2>
      <CertificateStore />
    </div>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import CertificateStore from './CertificateStore'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  created() {
    this.$store.dispatch('eth/initStore').then(() => {
      this.$store.dispatch('certs/initStore');
    });
  },
  components: {
    CertificateStore
  },

  computed: mapGetters('eth', ['isInitialized'])
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
