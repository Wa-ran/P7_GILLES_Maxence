<template>
  <transition
    tag="div"
    appear
    name="blockSlide"
    mode="out-in"
    @before-enter="delay">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "blockSlide",
  methods: {
    delay(element) {
      element.style.setProperty('--delay', (this.num *75) + 'ms')
    }
  },
  props: {
    num: {
      type: Number,
      required: true,
      default: 1
    }
  }
}
</script>

<style lang="scss">

.blockSlide {
  &-enter-active {
    border-radius: .25rem;
    animation: blockSlide 0.5s ease-out var(--delay) backwards;
  }
  &-leave-active {
    transition: all 0.1s;
  }
  &-leave-active-to {
    opacity: 0;
  }
}


@keyframes blockSlide {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.1;
    transform: translateX(-25%);
    background-color: red;
  }
  40% {
    opacity: 0.6;
  }
  70% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    background-color: #fff;
  }
}
</style>