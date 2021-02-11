<template>
  <mdb-btn
    @click="$router.push(path)"
    role="button"
    class="my-1 mx-0 px-3 py-1"
    :class="[isActive ? 'viewActive' : 'red lighten-4']"
    :tabindex="isActive ? -1 : ''"
    darkWaves block>
    <span class="font-weight-bold black-text text-capitalize">{{ text }}</span>
  </mdb-btn>
</template>

<script>
import { mdbBtn } from 'mdbvue';

export default {
  name: "MainButton",
  components: {
    mdbBtn
  },
  props: {
    text: {
      type: String,
      required: true
    },
    // for: {
    //   validator: function (value) {
    //     // The value must match one of these strings
    //     return ['form', 'submit'].indexOf(value) !== -1},
    //   default: 'base'
    // },
    path: {
      type: String,
      required: false,
      default: null
    },
    activePath: {
      type: String,
      required: false
    }
  },
  computed: {
    isActive: function () {
      return this.path !== null && this.activePath == this.path
    }
  }
}
</script>

<style lang="scss">
@import '../../mdb/mdbvue/scss/core/_colors.scss';

button {
  width: fit-content !important;
  & span {
    font-size: 1.25rem;
  }
  &:hover {
    background-color: $red-lighten-3;
  }
  &.viewActive {
    background-color: white;
    z-index: 1;
    box-shadow: 0 4px 0 0 rgb(255, 255, 255), 0 0px 4px 2px rgba(0, 0, 0, 0.12) !important;
  }
}
</style>