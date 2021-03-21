<template>
  <card-slide>
    <main-form
    :submitButton="'Confirmer'"
    :key="this.formComponent"
    class="w-auto mt-n2 p-3 white gpm-shadow-focus gpm-default-light">
      <component :is='this.formComponent'></component>
    </main-form>
  </card-slide>
</template>

<script>
import CardSlide from '@/components/CardSlide';
import MainForm from '@/components/MainForm';

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
  name: 'profil',
  components: {
    CardSlide,
    MainForm,
    infos,
    mail,
    pass
  },
  computed: {
    formComponent() {
      let str = this.$route.path;
      return str.substring(str.lastIndexOf('/')+1)
    }
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