<template>
  <div class="">
    <span>salut</span>
    <span>{{ getAccounts}}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CertificateStore',

  computed: mapGetters('eth', ['getAccounts'])
}
</script>

<style></style>
