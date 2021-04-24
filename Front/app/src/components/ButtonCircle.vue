<template>
  <mdb-btn
    @click="$emit('actionBtnCircle')"
    class="buttonCircle"
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
  },
  methods: {
    roundify() {
      document.querySelectorAll('.buttonCircle').forEach(btn => {
        let width = btn.offsetWidth;
        let height = btn.offsetHeight;
        if (width >= height) {
          btn.style.minHeight = width + 'px'
        } else {
          btn.style.minWidth = height + 'px'
        }
      })
    }
  },
  mounted() {
    this.roundify()
  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 0;
  border-radius: 50%;
}
</style>