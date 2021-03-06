<template>
  <div>

    <manageCommentaire :showModal="showModal" :purpose="purpose" :comm="manageComm"
    @closeModal="showModal = false"/>

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

    <Commentaire :avatarId="infos.userId">
      <template #sticker>
        <div class="px-1">
          {{ infos.createurNom }} {{ infos.createurPrenom }}        
        </div>
      </template>
      <div class="pt-1 comm">{{ infos.article }}</div>
    </Commentaire>

<!-- Espace commentaires -->
    <div v-for="comm in commList" :key="comm.id" :id="comm.id" class="pt-2">
      <Commentaire :avatarId="comm.userId">

        <template #sticker>
          <div class="px-1">
            {{ comm.nom }} {{ comm.prenom }}
          </div>
        </template>

        <ButtonPiti v-if="comm.signaled == 1 && isAdmin"
        @action="showModal = true, manageComm = comm, purpose= 'approve'"
        class="mr-4 gpm-warning gpm-warning-active btnDelete btn-text-normal">
          Commentaire signalé
        </ButtonPiti>

        <ButtonCircle v-if="comm.userId === userId || isAdmin"
        @actionBtnCircle="showModal = true, manageComm = comm, purpose= 'delete'"
        class="gpm-attention gpm-warning-active btnDelete">
          <i class="fas fa-times"></i>
        </ButtonCircle>

        <ButtonPiti v-else
        @action="showModal = true, manageComm = comm, purpose= 'signal'"
        class="gpm-attention gpm-warning-active btnDelete btn-text-normal">
          Signaler
        </ButtonPiti>

        <ImageShow v-if="comm.image == 1"
          :source="'http://localhost:3000/images/commentaires/' + comm.id + '.webp'"
          :textAlt="'Image partagée par ' + comm.nom + ' ' + comm.prenom"/>

        <div class="pt-1 comm">{{ comm.contenu }}</div>
        <div class="text-right date">{{ setDate(comm.date) }}</div>
      </Commentaire>
    </div>

    <div class="spinner-border" role="status" v-if="commLoading">
      <span class="sr-only">Chargement des commentaires.</span>
    </div>

<!-- Nouveau Commentaire -->
    <MainForm v-if="!showModal" class="mb-n5 w-100 z-depth-0 transparent"
    :submitClass="'pt-0 mt-n4 mr-5 d-flex flex-row-reverse'">
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

import ButtonCircle from '@/components/ButtonCircle.vue';
import ButtonPiti from '@/components/ButtonPiti.vue';
import Commentaire from '@/components/Commentaire.vue';
import ImageShow from '@/components/ImageShow.vue';
import InputFileDisplayer from '@/components/InputFileDisplayer.vue';
import manageCommentaire from './forms/manageCommentaire.vue';
import MainForm from '@/components/MainForm.vue';
import TextArea from '@/components/TextArea.vue';

export default {
  name: 'Participation',
  components: {
    mdbCard,
    mdbCardBody,
    ButtonCircle,
    ButtonPiti,
    Commentaire,
    ImageShow,
    InputFileDisplayer,
    MainForm,
    manageCommentaire,
    TextArea
  },
  props: ['groupeProps', 'participationProps'],
  data() {
    return {
      commLoading: false,
      articleLoaded: false,
      userId: this.$store.state.profil.id,
      wasSubmited: false,
      showModal: false,
      manageComm: null,
      purpose: null
    }
  },
  computed: {
    infos() {
      return this.$store.state.participationInfos
    },
    commList() {
      return this.$store.state.commentaires
    },
    isAdmin() {
      let admin = false;
      let members = this.$store.state.groupeMember;
      for (let member of members) {
        if (member.user == this.userId && member.admin == 1)
        admin = true
      }
      return admin
    },
    loading() {
      return this.$store.state.loading
    },
  },
  methods: {
    async getInfos() {
      await this.$store.dispatch('GPMRequest', { backFct: 'getParticipation', data: this.participationProps })
    },
    async getComment() {
      if (document.visibilityState === 'visible' && this.$route.name === 'participation') {
        setTimeout(() => {
          this.setLoader();
          if (document.visibilityState === 'visible' && this.$route.name === 'participation') {
            this.$store.dispatch('GPMRequest', { backFct: 'getParticipationComment', data: this.participationProps })
          }
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
    async setSubmit() {
      if (!this.showModal)
      await this.$store.dispatch('chooseSubmit', { backFct: 'postCommentaire', submitPath: this.$route.path })
    },
    onSubmit() {
      setTimeout(() => {
        this.commLoading = true;
        this.wasSubmited = true;
        this.showModal = false;
        this.setSubmit()
      }, 200);
    },
    setDate(date) {
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      let commDate = (new Date(Date.now() - new Date(date).getTime()).getTime())/(1000);
      if (commDate < 60) return 'Il y a ' + Math.round(commDate) + ' sec'
      else if (commDate/60 < 60) return 'Il y a ' + Math.round(commDate/60) + ' min'
      else if (commDate/3600 < 2) return 'Il y a ' + Math.round(commDate/3600) + ' heure'
      else if (new Date(Date.now()).getDay() == new Date(date).getDay()) return addZero(new Date(date).getHours()) + ':' + addZero(new Date(date).getMinutes())
      else return 'Le ' + date.split(' ')[0]
    }
  },
  watch: {
    loading() {
      if (!this.loading && !this.articleLoaded) this.articleLoaded = true; // On ne charge qu'une fois l'article
      if (document.querySelector('.was-validated') !== null && !this.$store.state.error.pending) {
        document.querySelector('.was-validated').classList.remove('was-validated');
        if (this.wasSubmited) {
          let textarea = document.querySelector('textarea');
            textarea.value = null
          this.wasSubmited = false
        }
      }
    },
    showModal() {
      this.setSubmit()
    }
  },
  async created() {
    this.setLoader();
    await this.getInfos();
    await this.getComment();
    await this.setSubmit();
    document.addEventListener('submit', this.onSubmit)
  },
  destroyed() {
    document.removeEventListener('submit', this.onSubmit)
  }
}
</script>

<style lang="scss" scoped>
.comm {
  white-space: pre-wrap;
}

.btnDelete {
  position: absolute;
  right: -0.3rem;
  top: -0.3rem;
}

.mainImg {
  width: 105%;
  align-self: center;
}
</style>