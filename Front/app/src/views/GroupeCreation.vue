<template>
  <div class="p-3 w-100">
    <TitleDoc
    :color="'gpm-lecture'">
      <h2 class="h4 m-1">
        Nouveau Groupe
      </h2>
    </TitleDoc>
    <AnimSlideDrop>
      <main-form
      :submitButton="'Confirmer'"
      :key="this.formComponent"
      class="w-100 px-4 gpm-lecture">
        <groupe/>
      </main-form>
    </AnimSlideDrop>
  </div>
</template>

<script>
import AnimSlideDrop from '@/components/AnimSlideDrop';
import MainForm from '@/components/MainForm';
import TitleDoc from '@/components/TitleDoc';

import groupe from '@/views/forms/groupe';

export default {
  name: 'GroupeCreation',
  components: {
    AnimSlideDrop,
    MainForm,
    TitleDoc,
    groupe
  }
}
</script>

<style lang="scss">
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