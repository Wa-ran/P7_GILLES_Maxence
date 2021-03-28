<template>
  <div class="all">
    <div class="h-auto d-flex flex-column justify-content-between">
      <ButtonDoc
      text="Test"
      class=""/>
      <ButtonDoc
      text="gpm-base-dark"
      class="gpm-base-dark gpm-base-active"/>
      <ButtonDoc
      text="gpm-base"
      class="gpm-base gpm-base-dark-active"/>
      <ButtonDoc
      text="gpm-default"
      class="gpm-default gpm-lecture-active"/>
      <ButtonDoc
      text="gpm-lecture"
      class="gpm-lecture gpm-default-active"/>
      <ButtonDoc
      text="gpm-alert-dark"
      class="gpm-alert-dark gpm-alert-active"/>
      <ButtonDoc
      text="gpm-alert"
      class="gpm-alert gpm-alert-dark-active"/>
      <ButtonDoc
      text="gpm-warning"
      class="gpm-warning gpm-attention-active"/>
      <ButtonDoc
      text="gpm-attention"
      class="gpm-attention gpm-warning-active"/>
      <ButtonDoc
      text="gpm-grey-dark"
      class="gpm-grey-dark gpm-grey-light-active"/>
      <ButtonDoc
      text="gpm-grey"
      class="gpm-grey gpm-grey-dark-active"/>
      <ButtonDoc
      text="gpm-grey-light"
      class="gpm-grey-light gpm-grey-active"/>
    </div>
  </div>
</template>

<script>
import ButtonDoc from '@/components/ButtonDoc';

export default {
  name: 'test',
  components: {
    ButtonDoc
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