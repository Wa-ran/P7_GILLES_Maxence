<template>
  <mdb-container class="container-fluid p-0" fluid>
    <mdb-navbar color="red" class="gpm-base navbar-3 z-depth-2 zind1" animated animation="2" light>
      <MainBrand class="my-2"/>
      <mdb-navbar-toggler class="m-auto">
        <mdb-navbar-nav class="d-flex flex-row flex-wrap w-100 m-0">
          <div class="d-flex justify-content-between w-100">
            <ButtonDoc
              v-for="page in pages"
              :key="page.id"
              :text="page.name"
              @action="$router.push(page.path)"
              class="gpm-grey-light"
            />
          </div>
        </mdb-navbar-nav>
        <form class="w-100 my-3">
          <mdb-form-inline class="w-100">
            <input class="gpm-grey-light form-control" type="text" placeholder="Search" aria-label="Search"/>
          </mdb-form-inline>
        </form>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </mdb-container>
</template>

<script>

import { mdbNavbar, mdbNavbarToggler, mdbNavbarNav, mdbContainer, mdbFormInline } from 'mdbvue';
import ButtonDoc from './ButtonDoc.vue';
import MainBrand from './MainBrand.vue';

export default {
  name: 'MainNav',
  components: {
    mdbNavbar,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbContainer,
    mdbFormInline,
    ButtonDoc,
    MainBrand
  },
  data() {
    return {
      pages: [
        { path: "/home", name: "Home" },
        { path: "/about", name: "About" },
        { path: "/home/profil", name: "Mon profil" }
      ]
    }
  }
}
</script>

<style lang="scss">
.logo {
  max-width: 80%;
}
ul {
  border-top: solid 2px #AEAEAE;
  margin-block-start: 0 !important;
  margin: 0 !important;
  padding-top: 1rem;
}
.animated-icon2 * {
  background-color: black !important;
}
</style>