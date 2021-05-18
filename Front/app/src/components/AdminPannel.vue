<template>
  <DocCard :color="'gpm-attention'">

    <template #title>
      <h2 class="h4 m-1">
        Admin
      </h2>
    </template>

    <template>
      <wrap withComp="AnimBlockSlide">
        <slot></slot>
      </wrap>
    </template>
  </DocCard>
</template>

<script>
import DocCard from '@/components/DocCard';
import Wrap from '@/components/Wrap';

export default {
  name: 'AdminPannel',
  components: {
    DocCard,
    Wrap,
  }
}
</script>