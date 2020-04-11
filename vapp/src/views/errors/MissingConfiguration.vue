<template>
    <div>
        <MdEmptyState md-icon="settings"
                      md-label="Configuration issues"
                      md-description="Your Metamask plugin or Brave wallet is not correctly configured."
        >
            <div class="md-layout md-gutter">
                <MdList>
                    <MdListItem md-expand>
                        <MdIcon>looks_one</MdIcon>
                        <span class="md-list-item-text">Open configuration</span>

                        <MdList slot="md-expand">
                            <MdListItem>
                                <span>- On Brave browser navigate to <i class="md-caption">brave://wallet</i></span>
                            </MdListItem>
                            <MdListItem>
                                <span>- With Metamask click on the icon on top right of your browser</span>
                            </MdListItem>
                        </MdList>
                    </MdListItem>

                    <MdListItem md-expand>
                        <MdIcon>looks_two</MdIcon>
                        <span class="md-list-item-text">Click Custom RPC with following:</span>

                        <MdList slot="md-expand">
                            <MdListItem>
                                <span>- Name: You can name it as you want or use <i class="md-caption">CertifY</i></span>
                            </MdListItem>
                            <MdListItem>
                                <span>- URL: <i class="md-caption">{{ blockchainUrl }}</i></span>
                            </MdListItem>
                        </MdList>
                    </MdListItem>
                </MdList>
            </div>
        </MdEmptyState>
    </div>
</template>

<script>
  export default {
    name: "MissingConfiguration",
    computed: {
      env() {
        return process.env.VUE_APP_ENV;
      },
      blockchainUrl() {
        return process.env.VUE_APP_BLOCKCHAIN_URL;
      }
    },
  }
</script>

<style scoped>
    .md-caption {
        font-size: 1.0rem !important;
    }
</style>