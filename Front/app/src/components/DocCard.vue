<template>
  <div class="w-100">
    <DocStickers :color="color" class="px-3 py-1">
      <slot name="title">
        <h2 class="h4 m-1">
          {{ this.$route.name }}
        </h2>
      </slot>
    </DocStickers>

    <AnimSlideDrop>
      <mdb-card class="w-100 p-3"
      :class="color">

        <slot></slot>

      </mdb-card>
    </AnimSlideDrop>
  </div>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';

import AnimSlideDrop from '@/components/AnimSlideDrop';
import DocStickers from '@/components/DocStickers';

export default {
  name: "DocCard",
  components : {
    mdbCard,
    AnimSlideDrop,
    DocStickers
  },
  props: {
    color: {
      type: String,
      required: true
    },
  }
}
</script>