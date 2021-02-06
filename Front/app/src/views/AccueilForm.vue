<template>
  <card-slide>
    <mdb-card class="p-3 mt-n2 mb-3 mx-3">
      <form @submit.prevent @keyup.enter="focusNext">
        <div class="black-text">

          <div v-if="this.currentPath === '/log'" key="log">
            <blockSlide :num=1>
              <mdb-input class="d-flex" label="Email" icon="envelope" group type="email" validate error="wrong" success="right" autofocus ref="autofocus"/>
            </blockSlide>
            <blockSlide :num=2>
              <mdb-input class="d-flex" label="Mot de passe" icon="lock" group type="password" validate/>
            </blockSlide>
          </div>

          <div v-else key="sign">
            <blockSlide :num=1>
              <div class="d-flex justify-content-between primaryColorFocusW my-3">
                <mdb-input class="d-flex pr-2 my-0" label="Nom" icon="user" group type="text" validate error="wrong" success="right" autofocus ref="autofocus"/>
                <mdb-input class="d-flex my-0" label="Prénom" group type="text" validate error="wrong" success="right"/>
              </div>
            </blockSlide>
            <blockSlide :num=2>
              <div class="d-flex primaryColorFocusW">
                <mdb-icon far icon="address-card" size="2x" class="mr-3" />
                <select @keydown.enter="isSelected" class="custom-select">
                  <option selected disabled value="null">Votre service :</option>
                  <option value="1">Logistique</option>
                  <option value="2">Marketing</option>
                  <option value="3">Ressources Humaines</option>
                  <option value="4">Direction</option>
                  <option value="5">Service Technique</option>
                </select>
              </div>
            </blockSlide>
            <blockSlide :num=3>
              <mdb-input class="d-flex" label="Email" name="Email" icon="envelope-open" group type="email" validate error="wrong" success="right"/>
            </blockSlide>
            <blockSlide :num=4>
              <mdb-input class="d-flex" label="Confirmez votre Email" icon="envelope" group type="text" validate error="wrong" success="right"/>
            </blockSlide>
            <blockSlide :num=5>
              <mdb-input class="d-flex" label="Mot de Passe" icon="lock-open" group type="password" validate/>
            </blockSlide>
            <blockSlide :num=6>
              <mdb-input class="d-flex" label="Confirmez votre mot de Passe" icon="lock" group type="password" validate/>
            </blockSlide>
          </div>
          <div class="d-flex flex-center py-4 mt-3" key="submit">
            <transition
              appear
              name="fade">
              <MainButton
                :path="'/Waran'"
                :text="'Envoyer'"
                type="submit"
              />
            </transition>
          </div>
        </div>
      </form>
    </mdb-card>
  </card-slide>
</template>

<script>
import { mdbInput, mdbIcon, mdbCard } from 'mdbvue';

import MainButton from '@/components/MainButton';
import cardSlide from '@/components/cardSlide';
import blockSlide from '@/components/blockSlide'

import focusNext from '@/mixins/focusNext';

export default {
  name: 'AccueilForm',
  components: {
    mdbInput,
    mdbIcon,
    mdbCard,
    MainButton,
    cardSlide,
    blockSlide
  },
  props: {
    currentPath: {
      type: String,
      required: true
      // Sert de 'clef' envoyée depuis le parent pour forcer le reload et l'utilisation du v-if
    }
  },
  methods: {
    isSelected($event) {
      // pour focusNext(): vérifie si une option à été selectionnée
      if ($event.target.value > 0) {
        $event.preventDefault();
        this.focusNext;
        // en pressant 'enter', passe directement au champ suivant au lieu de revenir sur le select
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // pour forcer l'autofocus au changement de route
    next(vm => {
      vm.$nextTick(function() {
        // attendre le chargement complet sinon :active reste sur le bouton
        vm.$refs.autofocus.focus();
      })
    });
    next()
  },
  mixins: [ focusNext ]
}
</script>

<style lang="scss">
.card-body {
  height: fit-content;
}
.md-form input {
  box-shadow: none !important;
}
select {
  background-color: inherit !important;
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