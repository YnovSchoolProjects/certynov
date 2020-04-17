<template>
    <div class="CYCertificate md-layout md-gutter">
        <template v-if="certificate.exist">
            <div class="md-layout-item md-size-10">
                <CYSuccessIcon />
            </div>
            <div class="md-layout-item md-size-90">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <span class="md-title">Matched certificate information</span>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label>Title</label>
                            <md-input disabled v-model="certificate.title" />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label>SHA256 Hash</label>
                            <md-input disabled v-model="certificate.hash" />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label>Owner</label>
                            <md-input disabled v-model="certificate.owner" />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label>Issuer</label>
                            <md-input disabled v-model="certificate.issuer" />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label>Issue date</label>
                            <md-input disabled v-model="certificate.issuedAt" />
                        </md-field>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="md-layout-item md-size-10">
                <CYFailureIcon />
            </div>
            <div class="md-layout-item md-size-90">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <span class="md-title">No certificate exist with the given information</span>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label>Hash</label>
                            <md-input disabled v-model="certificate.hash" />
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label>Owner</label>
                            <md-input disabled v-model="certificate.owner" />
                        </md-field>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
  import { Certificate } from "../services/Certificate";
  import CYSuccessIcon from "./CYSuccessIcon";
  import CYFailureIcon from "./CYFailureIcon";

  export default {
    name: "CYCertificate",
    components: {CYFailureIcon, CYSuccessIcon},
    model: {
      prop: 'certificate'
    },
    props: {
      certificate: {
        type: Certificate,
        required: true,
      }
    },
  }
</script>

<style scoped>
    .CYCertificate {
        margin-top: 2vh;
    }
</style>