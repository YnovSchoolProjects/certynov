<template>
  <MdApp>
    <MdAppToolbar>
      <MdButton :to="{ name: 'authenticate' }">Authenticate</MdButton>
      <MdButton :to="{ name: 'issuers' }">Issuers</MdButton>
      <MdButton :to="{ name: 'certify' }">Certify</MdButton>
    </MdAppToolbar>
    <MdAppContent>
      <router-view></router-view>
    </MdAppContent>
  </MdApp>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
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
