<template>
  <mdb-btn
    @click="$emit('action')"
    role="button"
    class="px-2 py-0 font-weight-bold rounded"
    darkWaves block>

    <slot>
      <span class="btn-text-normal">{{ text }}</span>
    </slot>

  </mdb-btn>
</template>

<script>
import mdbBtn from 'mdbvue/lib/components/mdbBtn';

export default {
  name: "ButtonPiti",
  components: {
    mdbBtn
  },
  props: {
    text: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 1.1rem !important;
}
</style>