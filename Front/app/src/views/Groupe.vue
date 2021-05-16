<template>
  <div class="h-100">
    <DocCard :color="'gpm-default'" :key="groupeProps">

      <template #title>
        <h2 class="h4 m-1">
          {{ groupeProps ? groupeProps : 'Groupes' }}
        </h2>
      </template>

      <router-view class="mx-auto w-100"/>

      <template v-if="(this.$route.name != 'groupeMember') && (this.$route.name != 'groupeCommSignaled')">
        <div v-show="!isCreation" class="w-100">
<!-- Vue normale -->
          <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Chargement...</span>
          </div>

          <wrap withComp="AnimBlockSlide" class="w-100 mt-n3">
            <ArticlePreview
            v-for="(item, index) of contentList" :key="index"
            class="w-100 mt-3 gpm-lecture"
            :btnColor="'gpm-attention gpm-warning-active'"
            :isGroupe="isGroupes">

              <template #title>
                <router-link :to="pathToContent(item)">
                  <h3 class="mx-auto mb-2 pb-0"
                  :class="isGroupes ? 'h4' : 'h5'">
                    {{ item.title }}
                  </h3>
                </router-link>
              </template>

              <template #text>
                <ImageShow
                  :source="groupeProps ?
                  'http://localhost:3000/images/participations/' + item.id + '.webp' :
                  ('http://localhost:3000/images/groupes/' + encodeURIComponent(item.title).replaceAll(/%|~/g, '') + '.webp')"
                  :textAlt="'Image du groupe.'"
                  :imgClass="'m-0 w-100 rounded'"/>
                  <!-- Ne plus jamais utiliser de texte en PK x( -->
                <div class="mt-2">
                  {{ item.text }}
                </div>
              </template>

            </ArticlePreview>
          </wrap>
        </div>
<!-- Vue formulaire de création -->
        <div v-if="isCreation" class="w-100">
          <main-form
          :submitButton="'Confirmer'"
          class="w-100 gpm-lecture">
            <component :is='this.formComponent'></component>
          </main-form>
        </div>

      </template>
    </DocCard>

    <div v-show="!isCreation" class="d-flex flex-wrap">
      <ButtonDoc
      @action="$router.push(pathToForm)"
      :text="isGroupes ? 'Créer un nouveau groupe' : 'Nouvelle participation'"
      class="mx-auto mt-3 gpm-attention gpm-warning-active gpm-shadow-focus"/>

      <ButtonDoc
      v-show="groupeProps && (this.$route.name != 'groupeMember')"
      @action="$router.push('/home/groupes/' + groupeProps + '/member')"
      :text="'Voir les membres du groupe'"
      class="mx-auto mt-3 gpm-default gpm-attention-active gpm-shadow-focus"/>

      <ButtonDoc
      v-show="groupeProps && isAdmin"
      @action="$router.push('/home/groupes/' + groupeProps + '/commSignaled')"
      :text="'Voir les commentaires signalés'"
      class="mx-auto mt-3 gpm-default gpm-attention-active gpm-shadow-focus"/>
    </div>
  </div>
</template>

<script>
import ButtonDoc from "@/components/ButtonDoc.vue"
import ArticlePreview from '@/components/ArticlePreview';
import ImageShow from '@/components/ImageShow';
import MainForm from '@/components/MainForm';
import DocCard from '@/components/DocCard';
import Wrap from '@/components/Wrap';

const groupe = () => ({
  component: import('@/views/forms/groupe')
});
const participation = () => ({
  component: import('@/views/forms/participation')
});

export default {
  name: 'Groupe',
  components: {
    ButtonDoc,
    ArticlePreview,
    ImageShow,
    MainForm,
    DocCard,
    Wrap,
    groupe,
    participation
  },
  props: ['groupeProps'],
  data() {
    return {
      noImg: false
    }
  },
  computed: {
    isAdmin() {
      let admin = false;
      if (this.$store.state.groupeMember) {
        for (let member of this.$store.state.groupeMember) {
          if (member.user === this.$store.state.profil.id && member.admin == 1) {
            admin = true
          }
        }
      }
      return admin
    },
    loading() {
      return this.$store.state.loading
    },
    routeName() {
      return this.$route.name
    },
    isGroupes() {
      return this.routeName == 'groupes' ? true : false
    },
    isCreation() {
      return this.routeName.match(/(creation)/) ? true : false
    },
    formComponent() {
      return this.groupeProps ? participation : groupe
    },
    pathToForm() {
      return this.groupeProps ?
      '/home/groupes/' + this.groupeProps + '/creation' :
      '/home/groupes/creation'
    },
    contentList() {
      let data = this.groupeProps ?
        this.$store.state.groupe :
        this.$store.state.groupeList;

      let list = [];

      for (const item in data) {
        let obj = {};
        for (const [key, value] of Object.entries(data[item])) {
          if (key.match(/(nom)/) || key.match(/(titre)/)) {
            obj['title'] = value
          }
          else if (key.match(/(description)/) || key.match(/(preview)/)) {
            obj['text'] = value
          }
          else {
            obj[key] = value
          }
        }
        list.push(obj)
      }
      return list
    }
  },
  methods: {
    pathToContent(item) {
      return this.groupeProps ?
      '/home/groupes/' + this.groupeProps + '/' + item.id :
      '/home/groupes/' + item.title
    },
    async dispatch() {
      if (this.routeName === 'groupeProps') {
        await this.$store.dispatch('GPMRequest', { backFct: 'getGroupeContent', data: this.groupeProps });
        await this.$store.dispatch('GPMRequest', { backFct: 'getGroupeMember', data: this.groupeProps })
      }
      else if (this.routeName === 'groupes') {
        await this.$store.dispatch('GPMRequest', { backFct: 'getGroupeList' })
      }
    }
  },
  created() {
    this.dispatch()
  },
  watch: {
    groupeProps() {
      this.dispatch()
    },
    routeName() { // MAJ 'forcée' après cération de participation 
      if (this.routeName === 'groupeProps') this.dispatch()
    }
  }
}
</script>