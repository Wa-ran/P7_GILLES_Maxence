<template>
  <div id="MainView" class="py-3 mx-auto">

    <router-view class="mx-auto w-100"/>

    <div v-if="this.$route.path == '/home'" class="w-100 mt-4">
      <DocCard :color="'gpm-attention'" key="annonce">

        <template #title>
          <h2 class="h4 m-1">
            Annonce
          </h2>
        </template>

        <template>
          <ArticlePreview class="gpm-lecture"
          :btnColor="'gpm-warning gpm-alert-active'">

            <template #title>
              <div class="spinner-border gpm-lecture" role="status" v-if="loading">
                <span class="sr-only">Chargement...</span>
              </div>

              <router-link :to="'home/groupes/' + lastAnnonce.groupe_nom + '/' + lastAnnonce.id">
                <h3 class="h5">{{ lastAnnonce.titre }}</h3>
              </router-link>
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
                <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">
                  <router-link :to="'home/groupes/' + lastAnnonce.groupe_nom">
                    {{ lastAnnonce.groupe_nom }}
                  </router-link>
                </mdb-badge>
                <!-- <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">{{ this.importance }}</mdb-badge> -->
              </div>
            </template>

          </ArticlePreview>

        </template>
      </DocCard>

      <DocCard :color="'gpm-default'" key="articles" class="mt-3">

        <template #title>
          <h2 class="h4 m-1">
            Dernières participations
          </h2>
        </template>

        <template>
          <ArticlePreview v-for="article of lastArticles" :key="article.id"
          class="gpm-lecture mt-3"
          :btnColor="'gpm-warning gpm-alert-active'">

            <template #title>
              <div class="spinner-border gpm-lecture" role="status" v-if="loading">
                <span class="sr-only">Chargement...</span>
              </div>

              <router-link :to="'home/groupes/' + encodeURIComponent(article.groupe_nom) + '/' + article.id">
                <h3 class="h5">{{ article.titre }}</h3>
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
                  <router-link :to="'home/groupes/' + encodeURIComponent(article.groupe_nom)">
                    {{ article.groupe_nom }}
                  </router-link>
                </mdb-badge>
                <!-- <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">{{ this.importance }}</mdb-badge> -->
              </div>
            </template>

          </ArticlePreview>

        </template>
      </DocCard>
    </div>
  </div>
</template>

<script>
import mdbBadge from 'mdbvue/lib/components/mdbBadge';

import ArticlePreview from '@/components/ArticlePreview';
import DocCard from '@/components/DocCard';
import ImageShow from '@/components/ImageShow';

export default {
  name: 'Home',
  components: {
    mdbBadge,
    ArticlePreview,
    DocCard,
    ImageShow
  },
  computed: {
    lastAnnonce() {
      return this.$store.state.lastAnnonce
    },
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
        await this.$store.dispatch('GPMRequest', { backFct: 'getLastAnnonce' });
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