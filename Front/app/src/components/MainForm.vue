<template>
  <card-slide>
    <mdb-card>
      <form
      novalidate @keydown.prevent.enter="nextInput"
      class="m-auto">
        <div class="black-text pt-4 px-3">

          <slot class="h-auto"></slot>

          <div class="d-flex flex-center py-4 mt-3 mx-auto">
            <!-- écoute de l'évènement sur le parent car submit.prevent, qui empêche le reload de la page, empêche aussi le fonctionnement du clic sur le bouton (tous concidérés 'submit') -->
            <div>
              <transition
              appear
              name="fade">
                <MainButton
                :text="this.submitButton"
                type=submit
                class="my-1 mx-0 gpm-shadow-focus gpm-prior-light"
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
import debouncer from '@/mixins/debouncer';
import checkPassword from '@/mixins/checkPassword';

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
  data() {
    return {
      loading: false,
      error: false,
      timeout: null
    }
  },
  computed: {
    backFct() {
      return this.$store.state.form.backFct
    },
    submitPath() {
      return this.$store.state.form.submitPath
    }
  },
  methods: {
    nextInput($event) {
      if ($event.target == document.querySelector('[type="submit"]')) {
        this.checkForm()
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
    onSubmit(event) {
      event.preventDefault();
      event.stopPropagation();
      this.debounce(this.checkForm())
    },
    checkForm() {
      let form = document.querySelector('form[novalidate]');
      let data = {};
      form.classList.add('was-validated');
      if (form.checkValidity() && !this.loading && !this.error) {
        this.loading = true;
        document.querySelectorAll('[required]').forEach(function(elem) {
          if (!elem.name.match(/(Conf)/)) {
            data[elem.name] = elem.value;
          }
        });
        this.sendForm(data)
      }
    },
    sendForm(data) {
      this.$store.dispatch('sendForm', { backFct: this.backFct, data: data })
      .then(() => this.$router.push(this.submitPath))
      .catch((error) => {
        this.loading = false;
        // this.error = true;
        return console.error(error)
      })
    }
  },
  mounted() {
    document.addEventListener('submit', this.onSubmit)
  },
  beforeDestroy() {
    document.removeEventListener('submit', this.onSubmit)
  },
  mixins: [ focusNext, debouncer, checkPassword ]
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