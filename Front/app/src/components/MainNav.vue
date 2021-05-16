<template>
  <header class="mb-n2 w-100 sticky-top" id="MainNav">
    <mdb-container class="container-fluid p-0 mb-n3" fluid>
      <div
      class="ml-0 py-2 mx-sm-auto d-flex gpm-base z-depth-2 zind3 position-relative">
        <MainBrand class="m-sm-auto"/>
        <NavBurger id="NavBurger" class="p-2 mx-2 mt-1 z-depth-1 position-absolute gpm-base"/>
      </div>

      <BreadCrumb/>
    </mdb-container>
  </header>
</template>

<script>
import mdbContainer from 'mdbvue/lib/components/mdbContainer';

import BreadCrumb from './BreadCrumb.vue';
import MainBrand from './MainBrand.vue';
import NavBurger from './NavBurger.vue';

export default {
  name: 'MainNav',
  components: {
    mdbContainer,
    BreadCrumb,
    MainBrand,
    NavBurger
  },
  data() {
    return {
      scrollPos: 0
    }
  },
  methods: {
    navPosition() {
      setTimeout(() => {
        let small = document.body.offsetWidth < 575 ? true : false;
        let NavBurger = document.getElementById('NavBurger');
        let navShow = document.querySelector('nav').classList.contains('show-navbar');
        if ((document.body.offsetWidth > 991) || navShow) { // NavBar dépliée
          NavBurger.style.top = '13vh';
        }
        else { // repliée
          NavBurger.style.top = null;
        }
        if (small) {
          NavBurger.style.right = 0;
          NavBurger.style.left = null
        }
        else {
          NavBurger.style.right = null;
          NavBurger.style.left = 0
        }        
      }); // attendre que l'event atteigne le button ('useCapture: true') et que la nav réagisse ('show-navbar') pour pouvoir correctement la positionner
    }
  },
  mounted() {
    this.navPosition();
    window.addEventListener('resize', this.navPosition);
    document.querySelector('#NavBurger').addEventListener('click', this.navPosition, true)
  },
  updated() {
    this.navPosition()
  },
  destroyed() {
    window.removeEventListener('resize', this.navPosition);
    document.querySelector('#NavBurger').removeEventListener('click', this.navPosition, true)
  }
}
</script>

<style lang="scss" scoped>
.container-fluid .ripple {
    display: none;
}
</style>