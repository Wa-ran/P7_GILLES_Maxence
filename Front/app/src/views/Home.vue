<template>
  <div id="MainView" class="py-3 mx-auto">

    <router-view class="mx-auto w-100"/>

    <div v-if="this.$route.path == '/home'">
      <ArticlePreview v-for="article of lastArticles" :key="article.id"
      class="w-100 mt-4 gpm-lecture"
      :btnColor="'gpm-warning gpm-alert-active'">

        <template #title>
          <div class="spinner-border gpm-lecture" role="status" v-if="loading">
            <span class="sr-only">Chargement...</span>
          </div>

          <router-link :to="'home/groupes/' + article.groupe_nom + '/' + article.id">
            <h2 class="h5">{{ article.titre }}</h2>
          </router-link>
        </template>

        <template #text>
          <ImageShow
            :source="'http://localhost:3000/images/participations/' + article.id + '.webp'"
            :textAlt="'Image de l\'article.'"
            :imgClass="'m-0 mb-2 w-100 rounded'"/>

          {{ article.preview }}
        </template>

        <template #infos>
          <div class="d-flex flex-wrap w-75">
            <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">
              <router-link :to="'home/groupes/' + article.groupe_nom">
                {{ article.groupe_nom }}
              </router-link>
            </mdb-badge>
            <!-- <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">{{ this.importance }}</mdb-badge> -->
          </div>
        </template>

      </ArticlePreview>
    </div>
  </div>
</template>

<script>
import mdbBadge from 'mdbvue/lib/components/mdbBadge';

import ArticlePreview from '@/components/ArticlePreview';
import ImageShow from '@/components/ImageShow';

export default {
  name: 'Home',
  components: {
    mdbBadge,
    ArticlePreview,
    ImageShow
  },
  computed: {
    lastArticles() {
      return this.$store.state.lastArticles
    },
    loading() {
      return this.$store.state.loading
    },
  },
  methods: {
    async dispatch() {
      if (this.$route.path == '/home') {
        await this.$store.dispatch('GPMRequest', { backFct: 'getLastArticles' })
      }
    },
  },
  created() {
    this.dispatch()
  }
}
</script>

<style lang="scss">
@media (min-width: 992px) {
  #MainView {
    max-width: 70%;
    display: flex;
  }
}
</style>