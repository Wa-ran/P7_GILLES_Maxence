<template>
  <img
    :src="mini ? this.$store.state.avatar.mini : this.$store.state.avatar.big"
    alt="Votre PP."
    class="z-depth-1 avatar"
    :class="mini ? 'rounded' : ''"/>
</template>

<script>
export default {
  props: {
    mini: {
      type: Boolean,
      default: true
    }
  }
}
</script>