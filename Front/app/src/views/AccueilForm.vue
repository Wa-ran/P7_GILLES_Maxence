<template>
  <card-slide>
    <mdb-card class="p-3 mt-n2 mb-3 mx-3">
      <form @submit="checkForm" @keyup.enter="focusNext">
        <div class="black-text">

          <component :is='this.formComponent'></component>

          <div class="d-flex flex-center py-4 mt-3">
            <transition
              appear
              name="fade">
              <MainButton
                @click.prevent
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
import mdbCard from 'mdbvue/lib/components/mdbCard';

import MainButton from '@/components/MainButton';
import CardSlide from '@/components/CardSlide';
import login from '@/components/login';

import focusNext from '@/mixins/focusNext';

const signup = () => ({
  component: import('@/components/signup')
})

export default {
  name: 'AccueilForm',
  components: {
    mdbCard,
    MainButton,
    CardSlide,
    login,
    signup
  },
  props: {
    activePath: {
      type: String,
      required: true
      // Sert de 'clef' envoyée depuis le parent pour forcer le reload et l'utilisation du v-if
    }
  },
  computed: {
    formComponent() {
      return this.activePath.replace('/', '')
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
    },
    checkForm($event) {
      $event.preventDefault();
      // document.body.appendChild(form);
      // let form = new FormData({user: 'vcxvcv'});
      // console.log(form);
      // let path = form.Email;
      this.$store.dispatch('postForm', {sdfsdf: 'usersdfsdf'})
      .then(console.log(this.$store.state.user))
      this.$router.push('path')
    }
  },
  beforeRouteEnter (to, from, next) {
    // pour forcer l'autofocus au changement de route
    next(vm => {
      vm.$nextTick(function() {
        // attendre le chargement complet (render et transitions)
        setTimeout(() => {
          vm.$el.querySelector('[autofocus]').focus();
        }, 300)
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