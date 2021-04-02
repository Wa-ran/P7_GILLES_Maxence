<template>
  <mdb-card>
    <mdb-view class="w-100 p-3">

      <slot name="name"></slot>

      <hr v-if="this.hr != ''" :class="this.hr">

      <div class="overhid">
        <AnimSlideDrop>
          <div v-show="this.showDescription">
            <slot name="description"></slot>
          </div>
        </AnimSlideDrop>
      </div>

    </mdb-view>
    <mdb-btn
    @click="triggerDescription()"
    class="w-100 m-0 p-0 zind1 rounded d-flex z-depth-0"
    :class="btnColor">
      <div class="m-auto icon-size d-flex">
        <i v-show="this.showDescription" class="fas fa-angle-up"></i>
        <i v-show="!this.showDescription" class="fas fa-angle-down"></i>
      </div>
    </mdb-btn>
  </mdb-card>
</template>

<script>
import mdbBtn from 'mdbvue/lib/components/mdbBtn';
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbView from 'mdbvue/lib/components/mdbView';

import AnimSlideDrop from '@/components/AnimSlideDrop';

import focusNext from '@/mixins/focusNext';

export default {
  name: 'ArticlePreview',
  components: {
    mdbBtn,
    mdbCard,
    mdbView,
    AnimSlideDrop
  },
  props: {
    btnColor: {
      type: String,
      required: false
    },
    hr: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      showDescription: false
    }
  },
  methods: {
    triggerDescription() {
      this.showDescription = !this.showDescription
    }
  },
  mixins: [ focusNext ]
}
</script>

<style lang="scss" scoped>
.btn-circle {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  text-decoration: none !important;
  margin: 0 !important;
}
.icon-size {
  font-size: 2rem;
  max-height: 100%;
  &i {
    display: block;
    height: fit-content;
    margin: auto;
  }
}
// OverRide
.AnimSlideDrop-enter-active {
  transform: translateY(-50px);
}
.AnimSlideDrop-enter-to {
  transform: translateY(0px);
}
.AnimSlideDrop-leave-to {
  transform: translateY(-50px);
}
.title {
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
}
</style>