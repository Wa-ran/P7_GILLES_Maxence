<template>
  <AnimSlideDrop>
    <mdb-card>
      <form
      novalidate @keydown.prevent.enter="nextInput"
      class="w-100 p-3">

        <slot class="h-auto"></slot>

        <div class="d-flex flex-center py-4 mt-3 mx-auto">
          <!-- écoute de l'évènement sur le parent car submit.prevent, qui empêche le reload de la page, empêche aussi le fonctionnement du clic sur le bouton (tous concidérés 'submit') -->
          <div>
            <AnimSlideFade
            :delay="350">
              <ButtonDoc
              :text="this.submitButton"
              type=submit
              class="my-1 mx-0 gpm-shadow-focus gpm-warning  gpm-alert-active"
              />
            </AnimSlideFade>
          </div>
        </div>
      </form>
    </mdb-card>
  </AnimSlideDrop>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';

import ButtonDoc from '@/components/ButtonDoc';
import AnimSlideDrop from '@/components/AnimSlideDrop';
import AnimSlideFade from '@/components/AnimSlideFade';

import focusNext from '@/mixins/focusNext';
import debouncer from '@/mixins/debouncer';
import checkPassword from '@/mixins/checkPassword';

export default {
  name: 'MainForm',
  components: {
    mdbCard,
    ButtonDoc,
    AnimSlideDrop,
    AnimSlideFade
  },
  props: {
    submitButton: {
      type: String,
      default: 'Envoyer'
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
      data['id'] = this.$store.state.profil.id;

      if (this.$route.params.groupeName) {
        data['groupe'] = this.$route.params.groupeName
      }
      if (this.$route.params.participation) {
        data['idParticipation'] = parseInt(this.$route.params.participation)
      }

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