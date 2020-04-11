<template>
    <div>
        <MdEmptyState md-icon="account_balance_wallet"
                      md-label="Create a wallet before"
                      md-description="Creating a wallet, you will be able to interact with ou blockchain. To do so you can use Metamask plugin, or use Brave browser directly."
        >
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-50">
                    <MdButton class="md-primary md-raised" target="_blank" href="https://metamask.io/">Install plugin</MdButton>
                </div>
                <div class="md-layout-item md-size-50">
                    <MdButton class="md-primary md-raised" target="_blank" href="https://support.brave.com/hc/en-us/articles/360035488071-How-do-I-manage-my-Crypto-Wallets-">Brave browser</MdButton>
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
