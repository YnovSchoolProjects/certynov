<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-20"></div>
        <div class="md-layout-item md-size-60">
            <md-tabs>
                <md-tab id="tab-owned" md-label="Owned Certificates" exact>
                    <OwnedCertificates />
                </md-tab>
                <md-tab id="tab-issued" md-label="Issued Certificates" v-if="isIssuer">
                    <IssuedCertificates />
                </md-tab>
            </md-tabs>
        </div>
    </div>
</template>

<script>
    import OwnedCertificates from "./OwnedCertificates";
    import IssuedCertificates from "./IssuedCertificates";
    import {mapGetters} from "vuex";

    export default {
        name: "Certificates",
        components: {
            IssuedCertificates,
            OwnedCertificates,
        },
        computed: {
            ...mapGetters('eth/certs', ['isIssuer']),
        },
    }
</script>

<style scoped>

</style>