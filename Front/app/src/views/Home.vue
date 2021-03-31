<template>
  <div class="w-100 h-100">
    <router-view></router-view>

    <ArticlePreview
    v-if="this.$route.path == '/home'"
    class="m-3 gpm-lecture"
    :com_number="lastAnnonce.com_number"
    :groupe="lastAnnonce.groupe_nom"
    :importance="lastAnnonce.importance"
    :btnColor="'gpm-warning gpm-alert-active'">
      <template #title>
        <h2 class="h5">{{ lastAnnonce.titre }}</h2>
      </template>
      <template #preview>{{ lastAnnonce.preview }}</template>
    </ArticlePreview>
  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview';

export default {
  components: {
    ArticlePreview
  },
  data() {
    return {
      lastAnnonce: this.$store.state.lastAnnonce
    }
  },
  async created() {
    await this.$store.dispatch('getLastAnnonce');
  },
}
</script>