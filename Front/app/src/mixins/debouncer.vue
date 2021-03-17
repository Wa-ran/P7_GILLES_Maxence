<script>
export default {
  methods: {
    debounceLead: function(func, timeout = 300) {
      let timer;
      let ctx = this;
      return (...args) => {
        if (!timer) {
          func.apply(ctx, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = undefined;
        }, timeout);
      }
    },
    debounce: function(fctToDeb) {
      this.debounceLead(() => fctToDeb)
    }
  }
}
</script>