<template>
  <div class="p-3">
    <div v-for="(item, index) in state" :key="index" class="my-3 rounded gpm-attention">
      "{{ index }}": {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    state() {
      return this.$store.state
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  word-wrap: break-word;
  overflow: auto;
}
</style>