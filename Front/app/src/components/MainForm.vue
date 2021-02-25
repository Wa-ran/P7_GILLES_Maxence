<template>
  <card-slide>
    <mdb-card>
      <form
      novalidate @submit.prevent @keydown.enter="nextInput"
      class="m-auto">
        <div class="black-text">

          <slot class="h-auto"></slot>

          <div class="d-flex flex-center py-4 mt-3 mx-auto">
            <!-- écoute de l'évènement sur le parent car submit.prevent, qui empêche le reload de la page, empêche aussi le fonctionnement du clic sur le bouton (tous concidérés 'submit') -->
            <div @mousedown="$emit('form-submit')">
              <transition
              appear
              name="fade">
                <MainButton
                :text="this.submitButton"
                class="gpm-shadow-focus gpm-prior-light"
                />
              </transition>
            </div>
          </div>
        </div>
      </form>
    </mdb-card>
  </card-slide>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';

import MainButton from '@/components/MainButton';
import CardSlide from '@/components/CardSlide';

import focusNext from '@/mixins/focusNext';

export default {
  name: 'MainForm',
  components: {
    mdbCard,
    MainButton,
    CardSlide
  },
  props: {
    submitButton: {
      type: String
    }
  },
  methods: {
    nextInput($event) {
      if ($event.target == document.querySelector('[type=submit]')) {
        this.checkForm($event)
      }
      else if ($event.target.tagName === "SELECT" && $event.target.value !== '') {
        // en cas de focus dans les options du select
        $event.preventDefault();
        this.focusNext();
      }
      else {
        this.focusNext()
      }
    }
  },
  mixins: [ focusNext ]
}
</script>

<style lang="scss">
.card-body {
  height: fit-content;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
  position: relative;
}
.fade-enter-active {
  transition: all 0.3s 0.35s;
}
.fade-leave-active {
  transition: all 0.1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>