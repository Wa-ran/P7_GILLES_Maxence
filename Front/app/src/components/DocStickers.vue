<template>
  <div class="mb-n2 rounded z-depth-1 viewActive zind1" :class="color">

    <slot></slot>

    <div
    class="w-100 coverShadow"
    :class="color">
    </div>
  </div>
</template>

<script>
export default {
  name: "DocStickers",
  props: {
    color: {
      type: String,
      default: 'gpm-lecture'
    }
  }
}
</script>

<style lang="scss" scoped>
.viewActive {
  z-index: 1;
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.12) !important;
  position: relative;
  overflow: visible;
  width: fit-content;
}
.coverShadow {
  position: absolute;
  left: 0;
  bottom: -7px;
  height: 9px;
  z-index: 2;
  border-radius: 0 0 3px 3px;
}
</style>