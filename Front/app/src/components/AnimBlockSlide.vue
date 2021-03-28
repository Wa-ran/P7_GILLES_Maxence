<template>
  <transition
    tag="div"
    appear
    name="AnimBlockSlide"
    mode="out-in"
    @before-enter="delay">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "AnimAnimBlockSlide",
  methods: {
    delay(element) {
      element.style.setProperty('--delay', ((this.number + 2) *75) + 'ms')
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

.AnimBlockSlide {
  &-enter-active {
    border-radius: .25rem;
    animation: AnimBlockSlide 0.5s ease-out var(--delay) backwards;
  }
  &-leave-active {
    transition: all 0.1s;
  }
  &-leave-active-to {
    opacity: 0;
  }
}

@keyframes AnimBlockSlide {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.1;
    transform: translateX(-25%);
    background-color: #091F43;
  }
  40% {
    opacity: 0.6;
  }
  70% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    background-color: transparent;
  }
}
</style>