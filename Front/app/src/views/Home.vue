<template>
  <div id="MainView" class="py-3 mx-auto">

    <div id="lgNav">
      <NavBurger class="gpm-base"/>    
    </div>

    <router-view class="mx-auto w-100"></router-view>

    <ArticlePreview
    v-if="this.$route.path == '/home'"
    class="w-100 mt-4 gpm-lecture"
    :btnColor="'gpm-warning gpm-alert-active'">

      <template #title>
        <div class="spinner-border gpm-lecture" role="status" v-if="loading">
          <span class="sr-only">Chargement...</span>
        </div>

        <h2 class="h5">{{ lastAnnonce.titre }}</h2>
      </template>

      <template #text>
        <ImageShow
          :source="'http://localhost:3000/images/participations/' + lastAnnonce.id + '.webp'"
          :textAlt="'Image de l\'article.'"
          :imgClass="'m-0 mb-2 w-100 rounded'"/>

        {{ lastAnnonce.preview }}
      </template>

      <template #infos>
        <div class="d-flex flex-wrap w-75">
          <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">{{ 0 }} com.</mdb-badge>
          <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">{{ lastAnnonce.groupe_nom }}</mdb-badge>
          <!-- <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">{{ this.importance }}</mdb-badge> -->
        </div>
      </template>

    </ArticlePreview>
  </div>
</template>

<script>
import mdbBadge from 'mdbvue/lib/components/mdbBadge';

import ArticlePreview from '@/components/ArticlePreview';
import ImageShow from '@/components/ImageShow';
import NavBurger from '@/components/NavBurger.vue';

export default {
  components: {
    mdbBadge,
    ArticlePreview,
    ImageShow,
    NavBurger
  },
  computed: {
    lastAnnonce() {
      return this.$store.state.lastAnnonce
    },
    loading() {
      return this.$store.state.loading
    },
  },
  methods: {
    async dispatch() {
      if (this.$route.path == '/home') {
        await this.$store.dispatch('GPMRequest', { backFct: 'getLastAnnonce' })
      }
    },
  },
  created() {
    this.dispatch()
  }
}
</script>

<style lang="scss">
@media (max-width: 991px) {
  #lgNav {
    display: none;
  }
}
@media (min-width: 992px) {
  #MainView {
    max-width: 70%;
    display: flex;
    padding-left: 1rem;
  }
  #lgNav {
    position: absolute;
    left: 0;
    top: 9.5vh
  }
}
</style>