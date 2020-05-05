<template>
    <div>
        <md-table v-model="searched" md-sort="organization" md-sort-order="asc" md-card>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Issued Certificates</h1>
                </div>

                <div class="md-toolbar-section-end">
                    <div class="md-layout">
                        <div class="md-layout-item md-size-50"></div>
                        <div class="md-layout-item md-size-50">
                            <md-field md-clearable>
                                <md-input placeholder="Search by name..." v-model="search"
                                          @input="searchOnTable"/>
                            </md-field>
                        </div>
                    </div>
                </div>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item : certificate }">
                <md-table-cell md-label="owner">{{ certificate.owner }}</md-table-cell>
                <md-table-cell md-label="hash">{{ certificate.hash }}
                </md-table-cell>
                <md-table-cell md-label="Actions">
                    <md-button class="md-primary" @click="show(certificate)">
                        <md-icon>visibility</md-icon>
                        <md-tooltip md-direction="right">Display details</md-tooltip>
                    </md-button>
                </md-table-cell>
            </md-table-row>

            <md-table-empty-state md-label="No certificates found"
                                  :md-description="`No certificates found for this '${search}' query.`"
            >
            </md-table-empty-state>
        </md-table>
        <CertificateModal ref="certificateModal" :certificate="selected" />
    </div>
</template>

<script>
    import CertificateModal from '../../components/CYCertificateModal.vue';

    export default {
        name: 'IssuedCertificates',
        components: {
            CertificateModal,
        },
        mounted() {
            const certs = this.$store.getters['eth/certs/getIssuedCertificates'];
            console.log(certs);
            this.searched = certs;
            this.certificates = certs;
        },
        data() {
            return {
                search: null,
                selected: {},
                certificates: [],
                searched: [],
            };
        },
        methods: {
            toLower(string) {
                return string.toString().toLowerCase();
            },
            filterItem(item, query) {
                return this.toLower(item.hash).includes(this.toLower(query)) || this.toLower(item.issuer).includes(this.toLower(query));
            },
            searchOnTable() {
                this.searched = this.certificates.filter((item) => this.filterItem(item, this.search));
            },
            show(certificate) {
                this.selected = certificate;
                this.$refs.certificateModal.open();
            }
        },
    };
</script>
