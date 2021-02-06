<template>
  <div>
    <mdb-btn
      @click="$router.push(path)"
      role="button"
      class="my-1 mx-0 px-3 py-1"
      :class="[isActive ? 'viewActive' : 'red lighten-4']"
      :tabindex="isActive ? -1 : ''"
      darkWaves block>
      <span class="font-weight-bold black-text text-capitalize">{{ text }}</span>
    </mdb-btn>
  </div>
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
      required: false
    },
    currentPath: {
      type: String,
      required: false
    }
  },
  computed: {
    isActive: function () {
      return this.currentPath == this.path
    }
  }
}
</script>

<style lang="scss">
@import '../../mdb/mdbvue/scss/core/_colors.scss';

button {
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