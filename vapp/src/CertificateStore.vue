<template>
  <div class="">
    <span>{{ getAccount }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CertificateStore',

  computed: mapGetters('eth', ['getAccount'])
}
</script>

<style></style>
