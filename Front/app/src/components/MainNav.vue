<template>
  <mdb-container class="container-fluid p-0 mb-n4" fluid>
    <mdb-navbar class="gpm-base navbar-3 z-depth-2 zind3" animated animation="2">
      <MainBrand class="my-2"/>
      <mdb-navbar-toggler class="m-auto">
        <mdb-navbar-nav class="d-flex flex-row flex-wrap w-100 m-0">
          <div class="d-flex flex-column justify-content-between w-100">
            <hr class="mt-2 mb-3 gpm-default w-100">
            <div class="w-100 d-flex justify-content-between">
              <ButtonDoc
              key="profil"
              text="Mon Profil"
              @action="$router.push('/home/profil')"
              class="w-50 mr-2 gpm-grey-light gpm-attention-active"
              />
              <ButtonDoc
              key="deco"
              text="Déconnexion"
              @action="$router.push('/')"
              class="w-50 ml-2 gpm-attention gpm-warning-active"
              />
            </div>
            <hr class="mt-3 mb-2 gpm-default w-100">
            <ButtonDoc
            v-for="page in pages"
            :key="page.id"
            :text="page.name"
            @action="$router.push(page.path)"
            class="my-2 w-75 gpm-grey-light gpm-attention-active"
            />
          </div>
        </mdb-navbar-nav>
        <form class="w-100 my-3">
          <mdb-form-inline class="w-100">
            <input class="gpm-default gpm-lecture-active form-control" type="text" placeholder="Search" aria-label="Search"/>
          </mdb-form-inline>
        </form>
      </mdb-navbar-toggler>
    </mdb-navbar>

    <div class="mt-n2 pt-2 w-100 d-flex flex-wrap rounded z-depth-2 zind2 gpm-base breadCrumb"
    aria-label="Breadcrumb">
      <div v-for="(path, name) in breadCrumb" :key="name">
        <router-link
        :to="path.replace('/', '')"
        :title="decodeURIComponent(name)">
        <!-- router-link 'to' rajoute un '/' au début, mais dans notre cas il est déjà présent -->
          {{ decodeURIComponent(name) }}
        </router-link>
        <span class="mr-1">-</span>
      </div>
    </div>

    <ButtonPiti
      v-if="this.$route.path != '/home'"
      @action="$router.push(retourLink)"
      :text="'Retour'"
      class="ml-auto mt-n2 pt-2 zind1 gpm-attention gpm-warning-active"/>
  </mdb-container>
</template>

<script>

import { mdbNavbar, mdbNavbarToggler, mdbNavbarNav, mdbContainer, mdbFormInline } from 'mdbvue';
import ButtonDoc from './ButtonDoc.vue';
import ButtonPiti from './ButtonPiti.vue';
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
    ButtonPiti,
    MainBrand
  },
  data() {
    return {
      pages: [
        { path: "/home", name: "Accueil" },
        { path: "/home/news", name: "Nouveautés" },
        { path: "/home/groupe", name: "Groupes" },
      ]
    }
  },
  computed: {
    breadCrumb() {
      let list = this.$route.path.split('/');
      let links = {};
      let path = '';
      for (let name of list) {
        path = path + '/' + name;
        links[name] = path;
      }
      return links
    },
    retourLink() {
      let link = Object.values(this.breadCrumb)[Object.keys(this.breadCrumb).length-2].replace('/','');
      return link
    }
  }
}
</script>

<style lang="scss">
.container-fluid * {
  position: relative; //Pour que les objets apparaissent sous les autres
  & .ripple {
    display: none;
  }
}
.logo {
  max-width: 80%;
}
.animated-icon2 * {
  background-color: #141414 !important;
}
.breadCrumb > a {
  color: inherit !important;
}
</style>