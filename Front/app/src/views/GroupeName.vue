<template>
  <TitleDoc :color="'gpm-default'">

    <template #title>
      <h2 class="h4 m-1">
        {{ groupeName }}
      </h2>
    </template>

    <template>
      <wrap withComp="AnimBlockSlide" class="w-100">

        <ArticlePreview
        v-for="(participation, index) in content" :key="index"
        class="gpm-lecture"
        :btnColor="'gpm-warning gpm-alert-active'">
          <template #title>
            <h2 class="h5">{{ participation.titre }}</h2>
          </template>
          <template #preview>{{ participation.preview }}</template>
          <template #infos>
            <div class="d-flex flex-wrap w-75">
              <mdb-badge class="mt-2 mr-2 gpm-base z-depth-0">0 com.</mdb-badge>
            </div>
          </template>
        </ArticlePreview>

      </wrap>
    </template>
  </TitleDoc>
</template>

<script>
import TitleDoc from '@/components/TitleDoc';
import ArticlePreview from '@/components/ArticlePreview';
import Wrap from '@/components/Wrap';

export default {
  name: 'GroupeName',
  components: {
    TitleDoc,
    ArticlePreview,
    Wrap
  },
  props: ['groupeName'],
  computed: {
    content() { return this.$store.state.groupe[this.groupeName] }
  },
  async created() {
    await this.$store.dispatch('GPMRequest', { backFct: 'groupeContent', data: this.groupeName });
  },
}
</script>