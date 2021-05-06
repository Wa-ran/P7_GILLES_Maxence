<template>
  <div class="h-100">
    <DocCard :color="'gpm-default'" :key="groupeProps">

      <template #title>
        <h2 class="h4 m-1">
          {{ groupeProps ? groupeProps : 'Groupes' }}
        </h2>
      </template>

      <template>
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
                <h3 class="mx-auto mb-2 pb-0"
                :class="isGroupes ? 'h4' : 'h5'">
                  <router-link :to="pathToContent(item)">
                    {{ item.title }}
                  </router-link>
                </h3>
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

    <ButtonDoc
    v-show="!isCreation"
    @action="$router.push(pathToForm)"
    :text="isGroupes ? 'Créer un nouveau groupe' : 'Nouvelle participation'"
    class="mx-auto my-3 gpm-attention gpm-warning-active gpm-shadow-focus"/>

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
    loading() {
      return this.$store.state.loading
    },
    isGroupes() {
      return this.$route.name == 'groupes' ? true : false
    },
    isCreation() {
      return this.$route.name.match(/(creation)/) ? true : false
    },
    formComponent() {
      return this.groupeProps ? participation : groupe
    },
    pathToForm() {
      return this.$route.path + '/creation'
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
      return this.groupeProps ? this.$route.path + '/' + item.id : this.$route.path + '/' + item.title
    },
    async dispatch() {
      if (this.$route.name === 'groupeProps') {
        await this.$store.dispatch('GPMRequest', { backFct: 'getGroupeContent', data: this.groupeProps })
        .catch((err) => {
          if (err.status === 404) {
            // Cas où aucune participation n'a encore été créée
            this.$router.push(this.$route.path + '/creation');
          }
        })
      }
      else {
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
    }
  }
}
</script>