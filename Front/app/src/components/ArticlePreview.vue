<template>
  <mdb-card>

    <button-circle
    v-if="!isGroupe"
    @actionBtnCircle="triggerAnnonce()"
    class="zind1 btn-circle d-flex"
    :class="btnColor">
      <div class="m-auto icon-size d-flex">
        <i v-show="this.showAnnonce" class="fas fa-angle-up"></i>
        <i v-show="!this.showAnnonce" class="fas fa-angle-down"></i>
      </div>
    </button-circle>

    <mdb-view class="w-100 p-3">

      <slot name="title"></slot>

      <hr class="mt-3 mb-2 gpm-grey-light w-100">

      <div class="overhid">
        <AnimSlideDrop>
          <div v-show="this.showAnnonce">
            <slot name="text"></slot>
            <hr class="mt-3 mb-2 gpm-grey-light w-100">
          </div>
        </AnimSlideDrop>
      </div>

      <slot name="infos"></slot>

    </mdb-view>
    <mdb-btn
    v-if="isGroupe"
    @click="triggerAnnonce()"
    class="w-100 m-0 m-square p-0 zind1 rounded d-flex z-depth-0"
    :class="btnColor">
      <div class="m-auto icon-size-square d-flex">
        <i v-show="this.showAnnonce" class="fas fa-angle-up"></i>
        <i v-show="!this.showAnnonce" class="fas fa-angle-down"></i>
      </div>
    </mdb-btn>
  </mdb-card>
</template>

<script>
import mdbBtn from 'mdbvue/lib/components/mdbBtn';
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbView from 'mdbvue/lib/components/mdbView';

import ButtonCircle from '@/components/ButtonCircle';
import AnimSlideDrop from '@/components/AnimSlideDrop';

import focusNext from '@/mixins/focusNext';

export default {
  name: 'ArticlePreview',
  components: {
    mdbBtn,
    mdbCard,
    mdbView,
    ButtonCircle,
    AnimSlideDrop
  },
  props: {
    btnColor: {
      type: String,
      required: false
    },
    isGroupe: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      showAnnonce: false
    }
  },
  methods: {
    triggerAnnonce() {
      this.showAnnonce = !this.showAnnonce
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
  margin: 0 !important;
}
.icon-size {
  font-size: 2.5rem;
  max-height: 100%;
  &-square {
    font-size: 1.5rem;
  }
  &i {
    display: block;
    height: fit-content;
    margin: auto;
  }
}
.m-square {
  margin-top: -2rem !important;
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