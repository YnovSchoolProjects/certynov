<template>
    <div>
        <MdEmptyState md-icon="account_balance_wallet"
                      md-label="Create a wallet before"
                      md-description="Creating a wallet, you will be able to interact with ou blockchain. To do so you can use Metamask plugin, or use Brave browser directly. Or you may have misconfigured Metamask or Brave."
        >
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <MdButton class="md-primary md-raised">Install plugin</MdButton>
                </div>
                <div class="md-layout-item md-size-50">
                    <MdButton class="md-primary md-raised">Brave browser</MdButton>
                </div>
            </div>
        </MdEmptyState>
    </div>
</template>

<script>
export default {
    name: "MissingExtension"
}
</script>
