<template>
  <card-slide>
    <mdb-card class="p-3 mt-n2 mb-3 mx-3">
      <wrap withComp="BlockSlide">
        <div v-for="(item, index) in profile" :key="index">
          <p>{{ item }}</p>
        </div>
        <p>Celui-là vient du serveur :) >> <span style="color: red">{{ profile.server }}</span></p>
      </wrap>
    </mdb-card>
  </card-slide>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';

import CardSlide from '@/components/CardSlide';
import Wrap from '@/components/Wrap';

import focusNext from '@/mixins/focusNext';

export default {
  name: 'Profile',
  components: {
    mdbCard,
    CardSlide,
    Wrap
  },
  computed: {
    profile() {return this.$store.state.profile}
  },
  mixins: [ focusNext ],
}
</script>

<style lang="scss">
.card-body {
  height: fit-content;
}
.md-form input {
  box-shadow: none !important;
}
select {
  background-color: inherit !important;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
  position: relative;
}
.fade-enter-active {
  transition: all 0.3s 0.35s;
}
.fade-leave-active {
  transition: all 0.1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>