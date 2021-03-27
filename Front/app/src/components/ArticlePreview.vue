<template>
  <card-slide>
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

        <span class="title">
          <slot name="title"></slot>
        </span>

        <hr class="mt-3 mb-2 gpm-grey-light w-100">

        <div v-show="this.showAnnonce === true">
          <span>
            <slot name="preview"></slot>
          </span>
        <hr class="mt-3 mb-2 gpm-grey-light w-100">
        </div>

        <div class="d-flex w-100">
          <mdb-badge class="mr-2 gpm-base z-depth-0">Commentaires</mdb-badge>
          <mdb-badge class="mr-2 gpm-base z-depth-0">Importance</mdb-badge>
          <mdb-badge class="mr-2 gpm-base z-depth-0">groupe</mdb-badge>
        </div>

      </mdb-view>
    </mdb-card>
  </card-slide>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbBadge from 'mdbvue/lib/components/mdbBadge';
import mdbView from 'mdbvue/lib/components/mdbView';

import ButtonCircle from '@/components/ButtonCircle';
import CardSlide from '@/components/CardSlide';

import focusNext from '@/mixins/focusNext';

export default {
  name: 'ArticlePreview',
  components: {
    mdbCard,
    mdbBadge,
    mdbView,
    ButtonCircle,
    CardSlide
  },
  props: {
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

<style lang="scss">
.btn-circle {
  position: absolute;
  right: -0.5rem;
  bottom: -0.5rem;
  text-decoration: none !important;
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
</style>