<template>
    <div>
        <md-dialog :md-active.sync="isOpen" class="issuer-modal">
            <md-dialog-title>Create issuer</md-dialog-title>

            <md-dialog-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <md-field>
                            <md-icon class="input-icon">account_balance_wallet</md-icon>
                            <label>Wallet Address</label>
                            <md-input v-model="issuer.address"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-60">
                        <md-field>
                            <md-icon class="input-icon">account_balance</md-icon>
                            <label>Organization</label>
                            <md-input v-model="issuer.organization"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-40">
                        <md-checkbox v-model="issuer.trusted" class="md-primary" />
                        <span class="md-checkbox-label md-caption cb-label">{{ issuer.trusted? 'Trusted' : 'Untrusted' }}</span>
                    </div>
                </div>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="close">Close</md-button>
                <md-button class="md-primary" @click="handleNewIssuer">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
  import Openable from "../services/mixins/Openable";
  import {Issuer} from "../services/Certificate";

  const getDefaultIssuer = () => new Issuer(['', '', false]);

  export default {
    name: "CYIssuerModal",
    mixins: [Openable],
    data() {
      return {
        issuer: getDefaultIssuer(),
      };
    },
    methods: {
      handleNewIssuer() {
        this.$emit('new-issuer', { ...this.issuer });
        this.close();
      }
    },
    watch: {
      isOpen() {
        this.issuer = getDefaultIssuer();
      },
    },
  }
</script>

<style scoped>
    .issuer-modal {
        top: 25vh;
    }

    .cb-label{
        font-size: 1rem;
    }

    .input-icon::after {
        background-color: transparent !important;
    }
</style>