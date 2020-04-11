<template>
    <div>
        <MdEmptyState md-icon="settings"
                      md-label="Configuration issues"
                      md-description="Your Metamask plugin or Brave wallet is not correctly configured."
        >
            <div class="md-layout md-gutter">
                <template v-if="env === 'dev'">
                    <MdList>
                        <MdListItem md-expand>
                            <MdIcon>looks_one</MdIcon>
                            <span class="md-list-item-text">Open configuration</span>

                            <MdList slot="md-expand">
                                <MdListItem>
                                    <span>On brave navigate to <i class="">brave://wallet</i></span>
                                </MdListItem>
                                <MdListItem>
                                    <span>With Metamask click on the icon on top right of your browser</span>
                                </MdListItem>
                            </MdList>
                        </MdListItem>

                        <MdListItem>
                            <MdIcon>looks_one</MdIcon>
                            <span class="md-list-item-text">Add </span>
                        </MdListItem>
                    </MdList>
                </template>
                <template v-else>
                    salut
                </template>
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
      }
    },
  }
</script>
