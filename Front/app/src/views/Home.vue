<template>
  <div class="p-3">
    <router-view class="w-100"></router-view>

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

export default {
  components: {
    mdbBadge,
    ArticlePreview
  },
  computed: {
    lastAnnonce() {
      return this.$store.state.lastAnnonce
    },
    loading() {
      return this.$store.state.loading
    }
  },
  methods: {
    async dispatch() {
      if (this.$route.path == '/home') {
        await this.$store.dispatch('GPMRequest', { backFct: 'getLastAnnonce' })
        .catch(error => console.log(error))
      }
    },
  },
  created() {
    this.dispatch()
  }
}
</script>