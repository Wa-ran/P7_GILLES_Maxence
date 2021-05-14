<template>
  <div>
    <DocStickers class="py-1 px-2 h6">
      <Avatar :userId="avatarId"/>
      <slot name="sticker"></slot>
    </DocStickers>
    <mdb-card class="w-100 mb-3 gpm-lecture">
      <mdb-card-body class="w-100 p-2 gpm-lecture rounded text-left">
        <slot></slot>
      </mdb-card-body>
    </mdb-card>
  </div>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbCardBody from 'mdbvue/lib/components/mdbCardBody';

import Avatar from '@/components/Avatar.vue';
import DocStickers from '@/components/DocStickers.vue';

export default {
  name: 'Commentaire',
  components: {
    mdbCard,
    mdbCardBody,
    Avatar,
    DocStickers
  },
  props: {
    avatarId: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 10;
}
</style>