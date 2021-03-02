<template>
  <mdb-btn
    @click="$emit('action')"
    role="button"
    class="my-1 mx-0 px-3 py-1 rounded"
    :class="[isActive ? 'viewActive gpm-default-light' : '']"
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
    path: {
      type: String,
      required: false,
      default: null
    },
    activePath: {
      // sert de clef pour rafraîchissement
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
@import '../../mdb/mdbvue/scss/custom-variables.scss';

button {
  width: fit-content !important;
  & span {
    font-size: 1.25rem;
  }
  &.viewActive {
    z-index: 1;
    box-shadow: 0 5px 0 0 $gpm-default-light, 0 0px 4px 2px rgba(0, 0, 0, 0.12) !important;
  }
}
</style>