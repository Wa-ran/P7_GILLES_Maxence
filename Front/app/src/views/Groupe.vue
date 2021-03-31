<template>
  <div class="w-100">
    <AnimBlockSlide>
      
      <router-view/>

      <ArticlePreview
      v-if="this.$route.path == '/home/groupe'"
      class="m-3 w-auto gpm-lecture"
      :com_number="0"
      :groupe="'something'"
      :importance="0"
      :btnColor="'gpm-warning gpm-alert-active'">
        <template #title>
          <h2 class="h5">
            <router-link :to="'groupe/' + GroupeName">
              {{ GroupeName }}
            </router-link>
          </h2>
        </template>
      </ArticlePreview>
    </AnimBlockSlide>
  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview';
import AnimBlockSlide from '@/components/AnimBlockSlide';

export default {
  name: 'Groupe',
  components: {
    ArticlePreview,
    AnimBlockSlide
  },
  computed: {
    GroupeName() {
      return Object.keys(this.$store.state.groupe)[0]
    }
  }
}
</script>