<template>
  <mdb-btn
    @click="$emit('actionBtnCircle')"
    role="button"
    darkWaves block>
    <slot></slot>
  </mdb-btn>
</template>

<script>
import mdbBtn from 'mdbvue/lib/components/mdbBtn';

export default {
  name: "ButtonCircle",
  components: {
    mdbBtn
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 1.1rem !important;
}
button {
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  max-height: 50px;
  padding: 0;
  border-radius: 50%;
}
</style>