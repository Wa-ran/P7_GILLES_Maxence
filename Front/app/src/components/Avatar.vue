<template>
  <img
    :src="image"
    alt="PP"
    class="z-depth-1 avatar"
    :class="imgClass"
    @error='error404'/>
</template>

<script>
export default {
  computed: {
    image() {
      if (this.userId) {
        return ('http://localhost:3000/images/avatars/' + this.userId + '_avatar_mini.webp')
      }
      else {
        return (this.mini ? this.$store.state.avatar.mini : this.$store.state.avatar.big)
      }
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
    },
    imgClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    error404(event) {
      event.target.setAttribute(
        'src',
        this.mini ? 'http://localhost:3000/images/avatars/user404_mini.webp' : 'http://localhost:3000/images/avatars/user404.webp'
      )
    }
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  max-width: 200px;
  max-height: 200px;
}
</style>