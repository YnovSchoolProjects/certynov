<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-size-20"></div>
            <div class="md-layout-item md-size-60">
                <md-table v-model="searched" md-sort="organization" md-sort-order="asc" md-card>
                    <md-table-toolbar>
                        <div class="md-toolbar-section-start">
                            <h1 class="md-title">Issuers</h1>
                        </div>

                        <div class="md-toolbar-section-end">
                            <div class="md-layout">
                                <div class="md-layout-item md-size-30"></div>
                                <div class="md-layout-item md-size-15">
                                    <MdButton class="md-icon-button md-raised md-primary add-button" @click="openIssuerModal">
                                        <MdIcon>add</MdIcon>
                                        <MdTooltip md-direction="left">Add issuer</MdTooltip>
                                    </MdButton>
                                </div>
                                <div class="md-layout-item md-size-50">
                                    <md-field md-clearable>
                                        <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
                                    </md-field>
                                </div>
                            </div>
                        </div>
                    </md-table-toolbar>

                    <md-table-row slot="md-table-row" slot-scope="{ item : issuer }">
                        <md-table-cell md-label="address">{{ issuer.address }}</md-table-cell>
                        <md-table-cell md-label="organization" md-sort-by="organization">{{ issuer.organization }}</md-table-cell>
                        <md-table-cell md-label="Actions">
                            <MdButton v-if="!issuer.trusted" class="md-primary" @click="saveIssuer(issuer, true)">
                                <MdIcon>done</MdIcon>
                                <MdTooltip md-direction="right">Trust issuer</MdTooltip>
                            </MdButton>
                            <MdButton v-if="issuer.trusted" class="md-accent" @click="saveIssuer(issuer, false)">
                                <MdIcon>clear</MdIcon>
                                <MdTooltip md-direction="right">Untrust issuer</MdTooltip>
                            </MdButton>
                        </md-table-cell>
                    </md-table-row>

                    <md-table-empty-state md-label="No issuers found" :md-description="`No issuer found for this '${search}' query.`"></md-table-empty-state>
                </md-table>
            </div>
        </div>
        <IssuerModal ref="issuerModal" @new-issuer="issuer => saveIssuer(issuer)" />
        <SnackBar ref="snackbar">
            <span>{{ message }}</span>
        </SnackBar>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import SnackBar from "../components/CYSnackBar";
  import IssuerModal from "../components/CYIssuerModal";

  export default {
    name: "Issuer",
    components: {
      IssuerModal,
      SnackBar,
    },
    data() {
      return {
        search: null,
        searched: [],
        issuers: [],
        message: '',
      };
    },
    mounted() {
      this.$store.dispatch('eth/certs/fetchIssuers').then(() => {
        this.issuers = this.getIssuers;
        this.searched = this.getIssuers;
      });
    },
    computed: {
      ...mapGetters('eth/certs', ['getIssuers']),
    },
    methods: {
      toLower(string) {
        return string.toString().toLowerCase();
      },
      filterItem(item, query) {
        return this.toLower(item.address).includes(this.toLower(query)) || this.toLower(item.address).includes(this.toLower(query));
      },
      searchOnTable() {
        this.searched = this.issuers.filter((item) => this.filterItem(item, this.search));
      },
      openIssuerModal() {
        this.$refs.issuerModal.open();
      },
      saveIssuer(issuer, status = null) {
        if (status === true) {
          issuer.trusted = true
        } else if (status === false) {
          issuer.trusted = false;
        }

        this.$store.dispatch('eth/certs/setTrustStatus', issuer).then((result) => {
          if (!result.status) {
            this.message = result.data.message;
            this.$refs.snackbar.open();
          }
        });
      }
    },
  }
</script>

<style scoped>
    .add-button {
        margin-top: 2vh !important;
    }
</style>