<template>
  <mdbContainer class="container-fluid p-0" fluid>
    <mdb-navbar color="red" class="lighten-4 navbar-3" animated animation="1" light>
      <MainBrand />
      <mdb-navbar-toggler>
        <mdb-navbar-nav class="d-flex flex-row flex-wrap justify-content-start">
          <MainButton
            v-for="page in pages"
            :key="page.id"
            :path="page.path"
            :text="page.name"
          />
        </mdb-navbar-nav>
        <form>
          <mdb-form-inline class="active-purple active-purple-2 mt-3">
            <input class="form-control mr-sm-2 mb-2" type="text" placeholder="Search" aria-label="Search"/>
          </mdb-form-inline>
        </form>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </mdbContainer>
</template>

<script>

import { mdbNavbar, mdbNavbarToggler, mdbNavbarNav, mdbContainer, mdbFormInline } from 'mdbvue';
import MainButton from './MainButton.vue';
import MainBrand from './MainBrand.vue';

export default {
  name: 'MainNav',
  components: {
    mdbNavbar,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbContainer,
    mdbFormInline,
    MainButton,
    MainBrand
  },
  data() {
    return {
      pages: [
        { path: this.$route.params.user , name: "Home" },
        { path: "/about", name: "About" },
        { path: this.$route.params.user + "/about", name: "AboutChild" }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../../mdb/mdbvue/scss/core/_colors.scss';

ul {
  border-top: solid 2px $black;
  padding-top: 1rem;
}
.animated-icon1 * {
  background-color: $black !important;
}
.active-purple-2 input[type=text]:focus:not([readonly]) {
    border: 1px solid $black;
    box-shadow: 0 2px 3px 0 $mdb-color-darken-2;
}
.active-purple input[type=text] {
    border: 1px solid $black;
    box-shadow: 0 1px 0 0 $black;
}
</style>