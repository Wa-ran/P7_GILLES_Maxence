<template>
  <transition
    appear
    name="cardSlide"
    mode="out-in"
    @beforeLeave="beforeLeave"
    @leave="leave"
    @enter="enter"
    @afterEnter="afterEnter">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      prevHeight: 0
    }
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    leave(element) {
      element.style.height = this.prevHeight;
      setTimeout(() => {
        element.style.height = 0;
      })
    },
    enter(element) {
      const { height } = getComputedStyle(element);
      element.style.height = 0;
      setTimeout(() => {
        element.style.height = height;
      })
    },
    afterEnter(element) {
      element.style.height = 'fit-content'
    }
  }
}
</script>

<style lang="scss">
.cardSlide-enter-active {
  transition: all 0.4s ease-out;
}
.cardSlide-leave-active {
  transition: all 0.2s;
}
.cardSlide-leave-to {
  opacity: 0;
  background-color: red;
}
</style>