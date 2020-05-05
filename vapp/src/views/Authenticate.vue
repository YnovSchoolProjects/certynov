<template>
    <div class="md-layout">
        <md-progress-bar class="md-layout-item md-size-90" v-show="loading" md-mode="indeterminate"/>
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
                            <md-icon class="icon">fingerprint</md-icon>
                            <label>Certificate hash</label>
                            <md-input v-model="hash">test</md-input>
                        </md-field>
                        <span>Provide file hash or directly the file</span>
                        <md-divider></md-divider>
                        <md-field>
                            <label>File</label>
                            <md-file v-model="file" @md-change="fileEmitted" :disabled="hashing"/>
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
                    </div>
                </div>
            </md-card-content>
        </md-card>
        <div class="md-layout-item md-size-20"></div>
        <div class="md-layout-item md-size-60">
            <CYCertificate v-if="certificate !== null" :certificate="certificate"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import CYCertificate from "../components/CYCertificate";
    import {Certificate} from "../services/Certificate";
    import FileHasher from "../services/mixins/FileHasher";

    export default {
        name: 'Authenticate',
        components: {CYCertificate},
        mixins: [FileHasher],
        data() {
            return {
                file: null,
                hash: null,
                hashing: null,
                address: null,
                loading: false,
                certificate: null,
            };
        },
        computed: {
            ...mapGetters('eth', ['getAccount']),
            ...mapGetters('eth/certs', ['getApi']),
        },
        methods: {
            async authenticateCertificate() {
                try {
                    this.loading = true;
                    const result = await this.getApi.authenticateCertificate({hash: this.hash, owner: this.address});

                    if (result.status) {
                        this.certificate = result.data;
                    } else {
                        const falseCerts = new Certificate([null, this.address, null, this.hash, null]);
                        falseCerts.exist = false;

                        this.certificate = falseCerts;
                    }
                } catch (e) {
                    console.error(e)
                } finally {
                    this.loading = false;
                }
            },
            async fileEmitted(fileList) {
                const file = fileList[0];

                this.hashing = true;
                this.hash = await this.hashFile(file);
                this.hashing = false;
            }
        }
    }
</script>

<style scoped>
    .icon::after {
        background-color: transparent !important;
    }
</style>