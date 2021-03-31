<template>
  <mdb-btn
    @click="$emit('action')"
    role="button"
    class="px-3 py-0 font-weight-bold rounded"
    darkWaves block>
    <span class="btn-text-normal">{{ text }}</span>
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
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 1.1rem !important;
}
</style>