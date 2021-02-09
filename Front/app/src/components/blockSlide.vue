<template>
  <transition
    tag="div"
    appear
    name="BlockSlide"
    mode="out-in"
    @before-enter="delay">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "BlockSlide",
  methods: {
    delay(element) {
      element.style.setProperty('--delay', (this.number *75) + 'ms')
    }
  },
  props: {
    number: {
      type: Number,
      required: true,
      default: 1
    }
  }
}
</script>

<style lang="scss">

.BlockSlide {
  &-enter-active {
    border-radius: .25rem;
    animation: BlockSlide 0.5s ease-out var(--delay) backwards;
  }
  &-leave-active {
    transition: all 0.1s;
  }
  &-leave-active-to {
    opacity: 0;
  }
}


@keyframes BlockSlide {
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