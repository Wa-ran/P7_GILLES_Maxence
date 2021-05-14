<template>
  <div>

    <mdbModal v-show="deleteComm" centered>
      <MainForm id="formDeleteComm" v-if="deleteComm" class="gpm-attention" :submitButton="'Oui'">

        <ButtonCircle
        @actionBtnCircle="deleteComm = null; setSubmit()"
        class="gpm-warning cross">
          <i class="p-1 fas fa-times fa-2x"></i>
        </ButtonCircle>

        <div class="pt-3 m-auto d-flex flex-column">
          <span class="mb-3">Voulez-vous supprimer ce commentaire ?</span>
          <span>" {{ deleteComm.contenu }} "</span>
          <mdbInput :value="deleteComm.id" name="idComm" class="mx-auto w-25 p-0 m-0 hiddenInput"/>
          <mdbInput :value="deleteComm.userId" name="idCreateur" class="mx-auto w-25 p-0 m-0 hiddenInput"/>
        </div>

      </MainForm>
    </mdbModal>

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
        <div class="ml-4 px-1">
          {{ infos.createurNom }} {{ infos.createurPrenom }}        
        </div>
      </template>
      <div class="pt-1 comm">{{ infos.article }}</div>
    </Commentaire>

<!-- Espace commentaires -->
    <div v-for="comm in commList" :key="comm.id" class="pt-2">
      <Commentaire :avatarId="comm.userId">

        <template #sticker>
          <div class="ml-4 px-1">
            {{ comm.nom }} {{ comm.prenom }}
          </div>
        </template>

        <ButtonCircle v-if="comm.userId === userId || isAdmin"
        @actionBtnCircle="deleteComm = { ...comm }; setSubmit()"
        class="gpm-attention cross">
          <i class="fas fa-times"></i>
        </ButtonCircle>

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
    <MainForm v-if="!deleteComm" class="mb-n5 w-100 z-depth-0 transparent"
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
import mdbInput from 'mdbvue/lib/components/mdbInput';
import mdbModal from 'mdbvue/lib/components/mdbModal';

import ButtonCircle from '@/components/ButtonCircle.vue';
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
    mdbInput,
    mdbModal,
    ButtonCircle,
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
      articleLoaded: false,
      userId: this.$store.state.profil.id,
      deleteComm: null,
      wasSubmited: false
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
      await this.$store.dispatch('GPMRequest', { backFct: 'getParticipationInfos', data: this.participationProps })
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
    setSubmit() {
      setTimeout(async () => {
        if (document.getElementById('formDeleteComm') !== null) {
          await this.$store.dispatch('chooseSubmit', { backFct: 'deleteCommentaire', submitPath: this.$route.path }) // Formulaire "delete"
        }
        else {
          await this.$store.dispatch('chooseSubmit', { backFct: 'postCommentaire', submitPath: this.$route.path }) // Formulaire d'envoi
        }
      }, 500);
    },
    onSubmit() {
      setTimeout(() => {
        this.commLoading = true;
        this.deleteComm = null;
        this.wasSubmited = true;
        this.setSubmit()
      }, 200);
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

.cross {
  position: absolute;
  right: -0.3rem;
  top: -0.3rem;
}

.mainImg {
  width: 105%;
  align-self: center;
}
</style>