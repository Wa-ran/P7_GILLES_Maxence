<template>
  <div class="w-100">
    <div class="px-3 py-1 rounded z-depth-1 viewActive zind1"
    :class="color">

      <slot name="title">
        <h2 class="h4 m-1">
          {{ this.$route.name }}
        </h2>
      </slot>

      <div
      class="w-100 coverShadow"
      :class="color">
      </div>
    </div>

    <AnimSlideDrop>
      <mdb-card class="w-100 pt-4 p-3"
      :class="color">

        <slot></slot>

      </mdb-card>
    </AnimSlideDrop>
  </div>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';

import AnimSlideDrop from '@/components/AnimSlideDrop';

export default {
  name: "TitleDoc",
  components : {
    mdbCard,
    AnimSlideDrop
  },
  props: {
    color: {
      type: String,
      required: true
    },
  }
}
</script>

<style lang="scss" scoped>
.viewActive {
  z-index: 1;
  box-shadow: 0 0px 4px 2px rgba(0, 0, 0, 0.12) !important;
  position: relative;
  overflow: visible;
}
.coverShadow {
  position: absolute;
  left: 0;
  bottom: -6px;
  height: 8px;
  z-index: 2;
  border-radius: 0 0 3px 3px;
}
</style>