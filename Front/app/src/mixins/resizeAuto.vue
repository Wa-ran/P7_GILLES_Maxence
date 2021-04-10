<script>
export default {
  methods: {
    resizeAuto(event) {
      this.$nextTick(() => {
        event.target.style.height = event.target.scrollHeight + 3 + 'px'
      })
    }
  }
}
</script>