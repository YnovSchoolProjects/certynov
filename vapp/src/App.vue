<template>
  <MdApp>
    <MdAppToolbar>
      <div class="md-toolbar-section-start">
        <span class="md-display-1"><img :src="require('./assets/logo.svg')" alt="logo" class="certify-logo" />CertifY</span>
      </div>
      <div class="md-toolbar-section-end">
        <span>
          <MdButton class="md-dense" @click="toClipboard()">{{ getAccount }} <MdIcon>{{ clipboardIcon }}</MdIcon></MdButton>
          <MdTooltip>Copy to clipboard</MdTooltip>
        </span>
        <MdButton :to="{ name: 'authenticate' }">Authenticate</MdButton>
        <MdButton v-if="isOwner" :to="{ name: 'issuers' }">Issuers</MdButton>
        <MdButton v-if="isIssuer" :to="{ name: 'certify' }">Certify</MdButton>
      </div>
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
  data() {
    return {
      clipboardIcon: 'move_to_inbox'
    };
  },
  computed: {
    ...mapGetters('eth', ['isInitialized', 'getAccount']),
    ...mapGetters('eth/certs', ['isOwner', 'isIssuer'])
  },
  methods: {
    toClipboard() {
      navigator.clipboard.writeText(this.getAccount);
      this.clipboardIcon = 'check_circle_outline';

      setTimeout(() => this.clipboardIcon = 'move_to_inbox', 1500)
    },
  }
}
</script>

<style scoped>
  .certify-logo {
    width: 2.5vw;
    height: 2.5vw;
    margin-right: 0.5vw;
  }
</style>
