<template>
  <AnimSlideDrop>
    <mdb-card class="p-3 gpm-default">
      <AnimSlideFade>
        <div class="mb-4 mt-3 mx-auto title">
          <h2 class="h3">{{ this.groupeName }}</h2>
        </div>
      </AnimSlideFade>
      <wrap withComp="AnimBlockSlide">
        <ArticlePreview v-for="participation in content" :key="participation"
        :com_number="participation.com_number"
        :importance="participation.importance"
        :btnColor="'gpm-warning gpm-alert-active'"
        class="gpm-lecture">
          <template #title>
            <h3 class="h5">{{ participation.titre }}</h3>
          </template>
          <template #preview>{{ participation.preview }}</template>
        </ArticlePreview>
      </wrap>
    </mdb-card>
  </AnimSlideDrop>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';

import AnimSlideFade from '@/components/AnimSlideFade';
import AnimSlideDrop from '@/components/AnimSlideDrop';
import ArticlePreview from '@/components/ArticlePreview';
import Wrap from '@/components/Wrap';

export default {
  name: 'GroupeName',
  components: {
    mdbCard,
    AnimSlideFade,
    AnimSlideDrop,
    ArticlePreview,
    Wrap
  },
  props: ['groupeName'],
  computed: {
    content() { return this.$store.state.groupe[this.groupeName] }
  },
  created() {
    this.$store.dispatch('getGroupeContent', this.groupeName);
  },
}
</script>