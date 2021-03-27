<template>
  <div class="all">
    <div class="h-auto d-flex flex-column justify-content-between">
      <MainButton
      text="Test"
      class=""/>
      <MainButton
      text="gpm-base-dark"
      class="gpm-base-dark gpm-base-active"/>
      <MainButton
      text="gpm-base"
      class="gpm-base gpm-base-dark-active"/>
      <MainButton
      text="gpm-default"
      class="gpm-default gpm-lecture-active"/>
      <MainButton
      text="gpm-lecture"
      class="gpm-lecture gpm-default-active"/>
      <MainButton
      text="gpm-alert-dark"
      class="gpm-alert-dark gpm-alert-active"/>
      <MainButton
      text="gpm-alert"
      class="gpm-alert gpm-alert-dark-active"/>
      <MainButton
      text="gpm-warning"
      class="gpm-warning gpm-attention-active"/>
      <MainButton
      text="gpm-attention"
      class="gpm-attention gpm-warning-active"/>
      <MainButton
      text="gpm-grey-dark"
      class="gpm-grey-dark gpm-grey-light-active"/>
      <MainButton
      text="gpm-grey"
      class="gpm-grey gpm-grey-dark-active"/>
      <MainButton
      text="gpm-grey-light"
      class="gpm-grey-light gpm-grey-active"/>
    </div>
  </div>
</template>

<script>
import MainButton from '@/components/MainButton';

export default {
  name: 'test',
  components: {
    MainButton
  }
}
</script>

<style lang="scss">
.all {
  min-height: 750px;
  min-width: 300px;
  & > div {
    margin-top: 20px !important;
    margin-left: 50px !important;
    height: 500px;
  }
}
</style>