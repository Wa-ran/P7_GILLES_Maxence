<template>
  <mdb-btn
    @click="$emit('action'), path !== null ? disableWaves($event) : ''"
    role="button"
    class="px-3 py-1 font-weight-bold rounded no-ripples"
    :class="[isActive ? 'viewActive ' + activeColor : defaultColor]"
    :tabindex="isActive ? -1 : ''"
    darkWaves block>
      <span class="btn-text-normal">{{ text }}</span>
      <div v-if="isActive"
      class="w-100 coverShadow"
      :class="activeColor">
      </div>
  </mdb-btn>
</template>

<script>
import mdbBtn from 'mdbvue/lib/components/mdbBtn';

export default {
  name: "MainButton",
  components: {
    mdbBtn
  },
  props: {
    text: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: false,
      default: null
    },
    activePath: {
      // sert de clef pour rafraîchissement
      type: String,
      required: false
    },
    defaultColor: {
      type: String,
      required: false,
    },
    activeColor: {
      type: String,
      required: false,
    }
  },
  computed: {
    isActive: function () {
      return this.path !== null && this.activePath == this.path
    }
  },
  methods: {
    disableWaves($event) {
      let nextChildren = $event.target.children;
      nextChildren.forEach(child => {
        if (child.nodeType == Node.ELEMENT_NODE
        && child.classList.contains('is-reppling'))
        { child.remove() }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../mdb/mdbvue/scss/custom-variables.scss';

button {
  width: fit-content !important;
  & span {
    font-size: 1.25rem;
  }
  &.viewActive { // Le boutton se confond avec la carte pour donner une impression de dossier
    z-index: 1;
    box-shadow: 0 0px 4px 2px rgba(0, 0, 0, 0.12) !important;
    position: relative;
    overflow: visible;
  }
  & *.coverShadow {
    position: absolute;
    left: 0;
    bottom: -6px;
    height: 8px;
    z-index: 2;
    border-radius: 0 0 3px 3px;
  }
}
</style>