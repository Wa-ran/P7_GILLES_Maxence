<template>
  <div class="w-100">
    <DocStickers class="py-1 px-2 h6">
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

import DocStickers from '@/components/DocStickers.vue';

export default {
  name: 'Commentaire',
  components: {
    mdbCard,
    mdbCardBody,
    DocStickers
  }
}
</script>