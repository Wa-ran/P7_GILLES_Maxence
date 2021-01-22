<template>
  <mdbContainer class="container-fluid p-0" fluid>
    <mdb-navbar color="red" class="lighten-4 navbar-3" animated animation="1" light>
      <mdb-navbar-brand>
        <router-link to="/">
          <img class="lighten-4 logo" color="red" alt="Accueil" src="../assets/Groupomania/icon-left-black-rsz.svg">
        </router-link>
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav class="d-flex flex-row justify-content-start">
          <MainNavButton :pathName="About" :path="about" />
          <mdb-btn outline="purple" class="mx-2 px-3 py-1" darkWaves block>
            <router-link to="/" class="font-weight-bold purple-text text-capitalize">Home</router-link>
          </mdb-btn>
          <mdb-btn outline="purple" class="mx-2 px-3 py-1" darkWaves block>            
            <router-link to="/about" class="font-weight-bold purple-text text-capitalize">About</router-link>
          </mdb-btn>
        </mdb-navbar-nav>
        <form>
          <mdb-form-inline class="active-purple active-purple-2 mt-3">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
          </mdb-form-inline>
        </form>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </mdbContainer>
</template> 

<script>

import { mdbBtn, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbContainer, mdbFormInline } from 'mdbvue';
import MainNavButton from './MainNavButton.vue';

export default {
  name: 'MainNav',
  components: {
    mdbBtn,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbContainer,
    mdbFormInline,
    MainNavButton
  }
}
</script>

<style lang="scss">
@import '../../mdb/mdbvue/scss/core/_colors.scss';
  .logo {
    max-height: 50px;
  }
  ul {
    border-top: solid 2px $purple-base;
    padding-top: 1rem;
  }
  nav a {
    font-size: 1.5rem;
  }
  .animated-icon1 * {
    background-color: $purple-base !important;
  }
  .active-purple-2 input[type=text]:focus:not([readonly]) {
      border: 1px solid $purple-base;
      box-shadow: 0 2px 3px 0 $purple-lighten-2;
  }
  .active-purple input[type=text] {
      border: 1px solid #ce93d8;
      box-shadow: 0 1px 0 0 #ce93d8;
  }
</style>