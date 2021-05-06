<template>
  <AnimSlideDrop>
    <mdb-card>
      <form id="MainForm"
      novalidate @keydown.prevent.enter="nextInput"
      class="w-100">

        <slot class="h-auto"></slot>

        <div :class="submitClass ? submitClass : 'd-flex flex-center py-4 mt-3 mx-auto'">
          <!-- écoute de l'évènement sur le parent car submit.prevent, qui empêche le reload de la page, empêche aussi le fonctionnement du clic sur le bouton (tous concidérés 'submit') -->
          <AnimSlideFade
          :delay="350">
            <ButtonDoc
            :text="this.submitButton"
            type=submit
            class="my-1 mx-0 gpm-shadow-focus gpm-warning  gpm-alert-active"
            />
          </AnimSlideFade>
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
    },
    submitClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  computed: {
    error() {
      return this.$store.state.error.pending
    },
    backFct() { // Définie au 'created' par les formulaires (dir. 'forms')
      return this.$store.state.form.backFct
    },
    submitPath() { // Définie au 'created' par les formulaires (dir. 'forms')
      return this.$store.state.form.submitPath
    }
  },
  methods: {
    nextInput($event) { // Pour focus le prochain input au clic sur Enter
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
      this.debounce(this.checkForm(), 300)
    },
    checkForm() {
      let form = document.querySelector('#MainForm');
      let data;
      form.classList.add('was-validated'); // Mdb

      if (form.checkValidity() && !this.error) {
        if (document.querySelector('[type="file"]')) { // Check si envoi multipart
          data = new FormData(form);

          data.append('id', this.$store.state.profil.id); // Ajout systématique d'infos requises par le serveur
          if (this.$route.params.groupeProps)
            data.append('groupe', this.$route.params.groupeProps);
          if (this.$route.params.participationProps)
            data.append('idParticipation', parseInt(this.$route.params.participationProps));
        } 
        else {
          data = {};
          
          for (let elem of form) {
            if (!elem.name.match(/(Conf)/) && elem.name != '')
              data[elem.name] = elem.value;
          }

          data['id'] = this.$store.state.profil.id;
          if (this.$route.params.groupeProps)
            data['groupe'] = this.$route.params.groupeProps;
          if (this.$route.params.participationProps)
            data['idParticipation'] = parseInt(this.$route.params.participationProps);
        }

        this.sendForm(data)
      }
    },
    async sendForm(data) {
      await this.$store.dispatch('sendForm', { backFct: this.backFct, data: data })
      .then(() => {
        if (!this.$store.state.error.pending) {
          if (this.submitPath === 'return') this.$router.go(-1)
          else this.$router.push(this.submitPath)
        }
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