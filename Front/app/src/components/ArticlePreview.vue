<template>
  <mdb-card class="p-3">

    <button-circle
    @actionBtnCircle="triggerAnnonce()"
    class="zind1 btn-circle d-flex"
    :class="btnColor">
      <div class="m-auto icon-size d-flex">
        <i v-show="this.showAnnonce === true" class="fas fa-angle-up"></i>
        <i v-show="this.showAnnonce === false" class="fas fa-angle-down"></i>
      </div>
    </button-circle>

    <mdb-view hover class="black-text">

      <slot name="title"></slot>

      <hr class="mt-3 mb-2 gpm-grey-light w-100">

      <div class="overhid">
        <AnimSlideDrop>
          <div
          v-if="this.showAnnonce === true"
          :key="this.showAnnonce">
            <span>
              <slot name="preview"></slot>
            </span>
          <hr class="mt-3 mb-2 gpm-grey-light w-100">
          </div>
        </AnimSlideDrop>
      </div>

      <div class="d-flex flex-wrap w-75">
        <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">{{ this.com_number ? this.com_number : '0' }} com.</mdb-badge>
        <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">{{ this.groupe }}</mdb-badge>
        <!-- <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">{{ this.importance }}</mdb-badge> -->
      </div>

    </mdb-view>
  </mdb-card>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbBadge from 'mdbvue/lib/components/mdbBadge';
import mdbView from 'mdbvue/lib/components/mdbView';

import ButtonCircle from '@/components/ButtonCircle';
import AnimSlideDrop from '@/components/AnimSlideDrop';

import focusNext from '@/mixins/focusNext';

export default {
  name: 'ArticlePreview',
  components: {
    mdbCard,
    mdbBadge,
    mdbView,
    ButtonCircle,
    AnimSlideDrop
  },
  props: {
    com_number: {
      type: Number,
      required: true
    },
    groupe: {
      type: String,
      required: true
    },
    importance: {
      type: Number,
      required: true
    },
    btnColor: {
      type: String,
      required: false
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
  text-decoration: none !important;
  margin: 0 !important;
}
.icon-size {
  font-size: 2.5rem;
  max-height: 100%;
  &i {
    display: block;
    height: fit-content;
    margin: auto;
  }
}
// OverRide
.AnimSlideDrop-leave-to {
  transform: translateY(-50px);
}
.title {
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
}
</style>