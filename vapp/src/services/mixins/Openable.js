export default {
  data() {
    return {
      isOpen: false,
      openableOptions: {},
    }
  },
  methods: {
    open(options = {}) {
      this.openableOptions = options;
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    }
  }
};