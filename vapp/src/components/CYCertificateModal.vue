<template>
    <md-dialog :md-active.sync="isOpen" class="issuer-modal">
        <md-dialog-title>Create issuer</md-dialog-title>

        <md-dialog-content>
            <Certificate :certificate="certificate" />
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="close">Close</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
    import Certificate from './CYCertificate.vue';
    import Openable from "../services/mixins/Openable";

    export default {
        name: "CYCertificateModal",
        components: {
            Certificate,
        },
        mixins: [Openable],
        props: {
            certificate: {
                type: [Object],
                required: true,
            }
        },
    }
</script>
