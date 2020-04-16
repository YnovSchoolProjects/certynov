<template>
    <div class="md-layout">
        <md-progress-bar class="md-layout-item md-size-90" v-show="loading" md-mode="indeterminate" />
        <div class="md-layout-item md-size-15"></div>
        <md-card class="md-layout-item md-size-70">
            <md-card-header>
                <div class="md-title">Authenticate a certificate</div>
                <span class="md-body-1">To authenticate a certificate, please provide either the hash or the file directly and the owners address.</span>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label>Certificate hash</label>
                            <md-input v-model="hash"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label>Owner address</label>
                            <md-input v-model="address"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-85"></div>
                    <div class="md-layout-item md-size-15">
                        <md-button @click="authenticateCertificate">
                            Authenticate
                        </md-button>
                        <md-button @click="auth">
                            fill
                        </md-button>
                    </div>
                </div>
            </md-card-content>
        </md-card>
        <div class="md-layout-item md-size-20"></div>
        <div class="md-layout-item md-size-60">
            <CYCertificateModal v-if="certificate !== null" :certificate="certificate" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CYCertificate from "../components/CYCertificate";

export default {
    name: 'Authenticate',
  components: {CYCertificateModal: CYCertificate},
  data() {
      return {
        hash: null,
        address: null,
        loading: false,
        certificate: null,
      };
    },
    computed: {
      ...mapGetters('eth', ['getAccount']),
    },
  methods: {
    authenticateCertificate() {
      this.loading = true;

      this.$store.dispatch('eth/certs/authenticateCertificate', { hash: this.hash, owner: this.address })
        .then((result) => {
          if (result.status) {
            this.certificate = result.data;
          }

          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    async auth() {
      console.log(this.getAccount);
      this.hash = 'ORIGINAL_CERTIFICATE';
      this.address = this.getAccount;
      this.$nextTick(() => {
        this.authenticateCertificate();
      });
    }
  }
}
</script>
