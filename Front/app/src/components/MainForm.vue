<template>
  <card-slide>
    <mdb-card>
      <form novalidate @submit.prevent @keydown.enter="nextInput">
        <div class="black-text">

          <slot></slot>

          <div class="d-flex flex-center py-4 mt-3">
            <!-- écoute de l'évènement sur le parent car submit.prevent empêche le fonctionnement du clic sur le bouton (tous concidérés 'submit') -->
            <div @mousedown="checkForm">
              <transition
                appear
                name="fade">
                <MainButton
                  :text="'Envoyer'"
                  type="submit"
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
    },
    checkForm($event) {
      $event.preventDefault();
      let valid = true;
      let form = document.querySelector('form');
      let data = {};
      form.classList.add('was-validated');
      document.querySelectorAll('[required]').forEach(function(elem) {
        if (elem.checkValidity() === false) {
          return valid = false;
        } else {
          return data[elem.name] = elem.value
        }
      });
      if (valid === true) {
        this.$store.dispatch('postForm', data);
        this.$router.push('Home');  
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