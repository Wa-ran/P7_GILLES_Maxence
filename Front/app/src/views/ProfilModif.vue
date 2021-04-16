<template>
    <DocCard :color="'gpm-default'">
    <template #title>
      <h2 class="h4 m-1">
        Modifez votre profil
      </h2>
    </template>

      <template>
        <main-form
        :submitButton="'Confirmer'"
        :key="this.formComponent"
        class="w-100 px-4 gpm-lecture">
          <component :is='this.formComponent'></component>
        </main-form>
      </template>
    </DocCard>
</template>

<script>
import AnimSlideDrop from '@/components/AnimSlideDrop';
import MainForm from '@/components/MainForm';
import DocCard from '@/components/DocCard';

const infos = () => ({
  component: import('@/views/forms/infos')
});
const mail = () => ({
  component: import('@/views/forms/mail')
});
const pass = () => ({
  component: import('@/views/forms/pass')
});

export default {
  name: 'ProfilModif',
  components: {
    AnimSlideDrop,
    MainForm,
    DocCard,
    infos,
    mail,
    pass
  },
  computed: {
    formComponent() {
      let str = this.$route.path;
      return str.substring(str.lastIndexOf('/')+1)
    }
  },
  methods: {
    dontBeThere() {
      if (this.formComponent == 'modification') {
        this.$router.push('/home/profil')
      }
    }
  },
  created() {
    this.dontBeThere()
  },
  updated() {
    this.dontBeThere()
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