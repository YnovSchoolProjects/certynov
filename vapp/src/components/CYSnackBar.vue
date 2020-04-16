<template>
    <div>
        <md-snackbar md-position="left" :md-duration="openableOptions.duration || DEFAULT_DURATION" :md-active.sync="isOpen" md-persistent>
            <slot name="default"></slot>
        </md-snackbar>
    </div>
</template>

<script>
import Openable from "../services/mixins/Openable";

const DEFAULT_DURATION = 4000;

export default {
  name: 'CYSnackBar',
  mixins: [Openable],
  data() {
    return {
      DEFAULT_DURATION: DEFAULT_DURATION,
    };
  }
}
</script>