<template>
  <div class="w-100 h-100">
    <router-view></router-view>

    <ArticlePreview
    v-if="this.$route.path == '/home'"
    class="m-3 gpm-lecture"
    :btnColor="'gpm-warning gpm-alert-active'">
      <template #title>{{ lastAnnonceTitle }}</template>
      <template #preview>{{ lastAnnoncePreview }}</template>
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
      lastAnnonceTitle: this.$store.state.lastAnnonce.titre,
      lastAnnoncePreview: this.$store.state.lastAnnonce.preview
    }
  },
  mounted() {
    this.$store.dispatch('getLastAnnonce');
  },
}
</script>