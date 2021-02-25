<template>
  <transition
    appear
    name="CardSlide"
    mode="out-in"
    @enter="enter"
    @afterEnter="afterEnter">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  methods: {
    enter(element) {
      setTimeout(() => {
        const { height } = getComputedStyle(element);
        element.style.height = 0;
        setTimeout(() => {
          element.style.height = height;
        })
      })
    },
    afterEnter(element) {
      element.style.height = 'fit-content'
    }
  }
}
</script>

<style lang="scss">
.CardSlide-enter-active {
  transition: all 0.4s ease-out;
}
.CardSlide-leave-active {
  transition: all 0.3s;
}
.CardSlide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>