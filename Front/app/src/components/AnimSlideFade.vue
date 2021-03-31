<template>
  <transition
  appear
  name="AnimSlideFade"
  mode="out-in"
  @before-enter="setDelay">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name:"AnimSlideFade",
  methods: {
    setDelay(element) {
      element.style.setProperty('--delay', (this.delay) + 'ms')
    }
  },
  props: {
    delay: {
      type: Number,
      required: false,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.AnimSlideFade-enter, .AnimSlideFade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
  position: relative;
}
.AnimSlideFade-enter-active {
  transition: all 0.3s  var(--delay);
}
.AnimSlideFade-leave-active {
  transition: all 0.1s;
}
.AnimSlideFade-enter-to {
  opacity: 1;
}
</style>