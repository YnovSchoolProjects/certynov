<template>
    <div class="md-layout">
        <div class="md-layout-item md-size-100">
            <md-progress-bar v-show="loading || hashing" md-mode="indeterminate" />
        </div>
        <div class="md-layout-item md-size-15"></div>
        <div class="md-layout-item md-size-70">
            <md-card>
                <md-card-header>
                    <span class="md-title">Issue a nes certificate</span>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-10"></div>
                        <div class="md-layout-item md-size-40">
                            <md-field>
                                <label>File</label>
                                <md-file v-model="certificate.file" @md-change="fileEmitted" :disabled="hashing"/>
                                <span v-if="certificate.hash !== ''" class="md-helper-text">{{ certificate.hash }}</span>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-40">
                            <md-field>
                                <md-icon class="icon">insert_comment</md-icon>
                                <label>Title</label>
                                <md-input v-model="certificate.title" :disabled="hashing" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-10"></div>

                        <div class="md-layout-item md-size-10"></div>
                        <div class="md-layout-item md-size-40">
                            <md-field>
                                <md-icon class="icon">account_box</md-icon>
                                <label>Owner</label>
                                <md-input v-model="certificate.owner" :disabled="hashing" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-100"></div>

                        <div class="md-layout-item md-size-65"></div>
                        <div class="md-layout-item md-size-25">
                            <md-button class="md-raised md-accent button" @click="reset" :disabled="hashing">
                                <md-icon>cached</md-icon>
                                Reset
                            </md-button>
                            <md-button class="md-raised md-primary button" @click="issue" :disabled="hashing">
                                <md-icon>check</md-icon>
                                Certify
                            </md-button>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <SnackBar ref="snackbar">
            <span>{{ message }}</span>
        </SnackBar>
    </div>
</template>

<script>
  import { sha256 } from 'js-sha256';
  import SnackBar from '../components/CYSnackBar.vue';

  const getDefault = () => ({
    file: null,
    hash: '',
    title: '',
    owner: '',
  });

  export default {
    name: "IssueCertificate",
    components: {
      SnackBar
    },
    data() {
      return {
        loading: false,
        hashing: false,
        fileList: null,
        certificate: getDefault(),
        message: '',
      };
    },
    methods: {
      reset() {
        this.certificate = getDefault();
        this.loading = false;
      },
      async issue() {
        this.loading = true;
        const api = await this.$store.getters['eth/certs/getApi'];
        const result = await api.issueCertificate(this.certificate);

        this.loading = false;
        if (result.status) {
          this.message = `Successfully issued certificate : ${this.certificate.hash}`;
          this.$refs.snackbar.open();
        } else {
          this.message = `Failed to issue certificate : ${result.data}`;
          this.$refs.snackbar.open();
        }

        this.certificate = getDefault();
      },
      async fileEmitted(fileList) {
        this.hashing = true;
        const file = fileList[0];

        try {
          const fileContent = await this.getFileContent(file);
          this.certificate.hash = sha256(fileContent);
        } catch (e) {
          console.error(e);
        }

        this.hashing = false;
      },
      getFileContent(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();

          fileReader.onload = () => {
            const data = fileReader.result.split(',')[1];
            resolve(data);
          };
          fileReader.onerror = (error) => reject(error);

          fileReader.readAsDataURL(file);
        });
      }
    }
  }
</script>

<style scoped>
    .button {
        padding: 0 1vw;
    }

    .icon::after {
        background-color: transparent !important;
    }
</style>