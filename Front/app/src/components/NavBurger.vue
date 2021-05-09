<template>
  <mdb-navbar tag="div" class="transparent rounded navbar-3 zind3 d-flex flex-sm-row-reverse" animated animation="2">

    <mdb-navbar-toggler class="px-3 m-auto gpm-base">
      <mdb-navbar-nav class="m-0 w-100 container d-flex flex-row flex-wrap">
        <div class="d-flex flex-column justify-content-between w-100">
          <hr class="mt-2 mb-3 gpm-default w-100">
          <div id="toProfil" class="w-100 d-flex justify-content-between">

            <ButtonDoc
            @action="$router.push('/home/profil')"
            class="w-50 mr-2 gpm-grey-light gpm-attention-active with-avatar">
              <Avatar/>
              <span class="ml-3 btn-text-normal">Mon Profil</span>
            </ButtonDoc>

            <ButtonDoc
            text="Déconnexion"
            @action="$router.push('/')"
            class="w-50 ml-2 gpm-attention gpm-warning-active"/>
          </div>

          <hr class="mt-3 mb-2 gpm-default w-100">

          <ButtonDoc
          v-for="page in pages"
          :key="page.id"
          :text="page.name"
          @action="$router.push(page.path)"
          class="my-2 w-75 gpm-grey-light gpm-attention-active"/>
        </div>
      </mdb-navbar-nav>

      <form class="w-100 my-3">
        <mdb-form-inline class="w-100">
          <input class="gpm-lecture form-control" type="text" placeholder="Search" aria-label="Search"/>
        </mdb-form-inline>
      </form>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>

import { mdbNavbar, mdbNavbarToggler, mdbNavbarNav, mdbFormInline } from 'mdbvue';
import Avatar from './Avatar.vue';
import ButtonDoc from './ButtonDoc.vue';

export default {
  name: 'MainNav',
  components: {
    mdbNavbar,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbFormInline,
    Avatar,
    ButtonDoc
  },
  data() {
    return {
      pages: [
        { path: "/home", name: "Accueil" },
        { path: "/home/news", name: "Nouveautés" },
        { path: "/home/groupes", name: "Groupes" },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.with-avatar {
  overflow: visible;
}
.avatar {
  position: absolute;
  top: -8px;
  left: -10px;
  z-index: 1;
  max-height: 100%;
}

@media (min-width: 992px) {
  nav {
    display: flex;
    flex-wrap: wrap;
    margin-left: 1rem;
    padding: 0 !important;
    max-width: 15vw;
    & ul {
      padding: 0;
    }
    & button {
      width: 100% !important;
    }
    & input {
      max-width: 100%;
    }
  }
  #toProfil {
    flex-wrap: wrap;
    width: 100%;
    & {
      button {
        margin: 0 0 1rem 0 !important;
        width: 100%;
      }
    }
  }
}
</style>