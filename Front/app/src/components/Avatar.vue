<template>
  <img
    :src="image"
    alt="PP"
    class="z-depth-1 avatar"
    :class="mini ? 'rounded' : ''"
    @error='errorClass'/>
</template>

<script>
export default {
  computed: {
    image() {
      if (this.userId) {
        return ('http://localhost:3000/images/avatars/' + this.userId + '_avatar_mini.webp')
      }
      else return (this.mini ? this.$store.state.avatar.mini : this.$store.state.avatar.big)
    }
  },
  props: {
    mini: {
      type: Boolean,
      default: true
    },
    userId: {
      type: [Number, String],
      required: false
    }
  },
  methods: {
    errorClass(event) {
      event.target.style.display = 'none'
    }
  },
}
</script>

<style lang="scss">
img:before {
  content: ' ';
  display: block;
  position: absolute;
  height: 50px;
  width: 50px;
}
</style>