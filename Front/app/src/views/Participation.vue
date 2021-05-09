<template>
  <div>
    <mdb-card class="mb-3 gpm-default">

      <div class="mx-auto mt-3 spinner-border" role="status" v-if="!articleLoaded">
        <span class="sr-only">Chargement...</span>
      </div>

      <div class="p-3 w-100">
        <h2 class="h5 m-1">
          {{ infos.titre }}
        </h2>      
      </div>

      <ImageShow
        :source="'http://localhost:3000/images/participations/' + participationProps + '.webp'"
        :textAlt="'Image associée'"
        :imgClass="'my-0 mb-n1 rounded mainImg'"/>

      <hr class="my-0 mx-auto w-75 black">

      <mdb-card-body class="rounded">
        <div class="h6">
          {{ infos.preview }}
        </div>
      </mdb-card-body>

    </mdb-card>

    <Commentaire>
      <template #sticker>
        <Avatar :userId="infos.createurId"/>
        <div class="ml-4 px-1">
          {{ infos.createurNom }} {{ infos.createurPrenom }}        
        </div>
      </template>
      <div class="pt-1 comm">{{ infos.article }}</div>
    </Commentaire>

<!-- Espace commentaires -->
    <div v-for="comm in commList" :key="comm.id" class="pt-2">
      <Commentaire>
        <template #sticker>
          <Avatar :userId="comm.userId"/>
          <div class="ml-4 px-1">
            {{ comm.nom }} {{ comm.prenom }}
          </div>
        </template>
        <ImageShow v-if="comm.image == 1"
          :source="'http://localhost:3000/images/commentaires/' + comm.id + '.webp'"
          :textAlt="'Image partagée par ' + comm.nom + ' ' + comm.prenom"/>
        <div class="pt-1 comm">{{ comm.contenu }}</div>
      </Commentaire>
    </div>

    <div class="spinner-border" role="status" v-if="commLoading">
      <span class="sr-only">Chargement des commentaires.</span>
    </div>

<!-- Nouveau Commentaire -->
    <MainForm class="mb-n5 w-100 z-depth-0 transparent"
    :submitClass="'pt-0 mt-n4 mr-2 d-flex flex-row-reverse'">
      <Commentaire class="w-100">
        <template #sticker>
          Participez !
        </template>

        <InputFileDisplayer/>

        <TextArea
        class="zind1"
        :id="'commentaire'" :name="'contenu'" :label="'Votre commentaire.'"/>

      </Commentaire>
    </Mainform>

  </div>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbCardBody from 'mdbvue/lib/components/mdbCardBody';

import Commentaire from '@/components/Commentaire.vue';
import ImageShow from '@/components/ImageShow.vue';
import InputFileDisplayer from '@/components/InputFileDisplayer.vue';
import MainForm from '@/components/MainForm.vue';
import TextArea from '@/components/TextArea.vue';

export default {
  name: 'Participation',
  components: {
    mdbCard,
    mdbCardBody,
    Commentaire,
    ImageShow,
    InputFileDisplayer,
    MainForm,
    TextArea
  },
  props: ['groupeProps', 'participationProps'],
  data() {
    return {
      commLoading: false,
      articleLoaded: false
    }
  },
  computed: {
    infos() {
      return this.$store.state.participationInfos
    },
    commList() {
      return this.$store.state.commentaires
    },
    loading() {
      return this.$store.state.loading
    },
  },
  methods: {
    async getInfos() {
      await this.$store.dispatch('GPMRequest', { backFct: 'getParticipationInfos', data: this.participationProps })
    },
    async setSubmit() {
      await this.$store.dispatch('chooseSubmit', { backFct: 'postCommentaire', submitPath: this.$route.path })
    },
    async getComment() {
      if (document.visibilityState === 'visible' && this.$route.name === 'participation') {
        setTimeout(() => {
          this.setLoader();
          this.$store.dispatch('GPMRequest', { backFct: 'getParticipationComment', data: this.participationProps });
          this.getComment()
        }, 3000)
      }
      else {
        document.addEventListener('visibilitychange', this.getComment, { once: true });
      }
    },
    setLoader() { 
      // Le loader s'active pour au moins 1sec. uniquement si le loading est true depuis au moins 1sec.
      setTimeout(() => {
        if (this.loading) this.commLoading = true
        else if (this.commLoading) this.commLoading = false
      }, 1000);
    },
    onSubmit() {
      this.$store.dispatch('setLoading', true);
      if (document.getElementById('commentaire').value === '') document.getElementById('commentaire').value = ' '
    }
  },
  watch: {
    loading() {
      if (!this.loading && !this.articleLoaded) this.articleLoaded = true; // On ne charge qu'une fois l'article
      if (document.querySelector('.was-validated') !== null && !this.$store.state.error.pending) {
        document.querySelector('.was-validated').classList.remove('was-validated');
        document.getElementById('commentaire').value = '';
        this.submited = false // Remise à zéro du formulaire de commentaire
      }
    }
  },
  async created() {
    this.setLoader();
    await this.getInfos();
    await this.setSubmit();
    await this.getComment();
    document.addEventListener('submit', this.onSubmit())
  },
  mounted() {
    
  },
  beforeDestroy() {
    document.removeEventListener('submit', this.onSubmit())
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 10;
}

.comm {
  white-space: pre-wrap;
}

.mainImg {
  width: 105%;
  align-self: center;
}
</style>