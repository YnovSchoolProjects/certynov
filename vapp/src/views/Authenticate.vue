<template>
    <div class="">
        <span>Account : {{ getAccount }}</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Certify',
    computed: mapGetters('eth', ['getAccount'])
}
</script>

<style></style>
