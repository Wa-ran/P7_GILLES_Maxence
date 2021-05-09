<template>
  <header class="mb-n2 w-100 sticky-top" id="MainNav">
    <mdb-container class="container-fluid p-0 mb-n3" fluid>
      <div
      class="ml-0 py-2
      mx-sm-auto
      d-flex gpm-base z-depth-2 zind3">
        <MainBrand class="m-sm-auto"/>
        <NavBurger v-if="smallDevice" class="p-0 mx-1 my-2 z-depth-0 transparent innerNav"/>
      </div>

      <div class="breadCrumb">
        <div class="mt-n2 pt-2 w-100 d-flex flex-wrap rounded z-depth-2 zind2 gpm-base"
        aria-label="Breadcrumb">
          <div v-for="(link, index) in breadCrumb" :key="index">
            <span class="ml-2">-</span>
            <router-link
            :to="link.path"
            :title="decodeURIComponent(link.name)"
            :class="lastBreadClass(index)">
              {{ breadName(link.name, index) }}
            </router-link>
          </div>
        </div>
      </div>

      <ButtonPiti
        v-if="this.$route.path != '/home'"
        @action="$router.push(retourLink)"
        :text="'Retour'"
        class="mr-0 mt-n2 pt-2 zind1 gpm-attention gpm-warning-active"/>
    </mdb-container>

    <NavBurger v-if="!smallDevice" class="d-lg-none gpm-base outerNav z-depth-2"/>
  </header>
</template>

<script>
import mdbContainer from 'mdbvue/lib/components/mdbContainer';

import ButtonPiti from './ButtonPiti.vue';
import MainBrand from './MainBrand.vue';
import NavBurger from './NavBurger.vue';

export default {
  name: 'MainNav',
  components: {
    mdbContainer,
    ButtonPiti,
    MainBrand,
    NavBurger
  },
  data() {
    return {
      scrollPos: 0
    }
  },
  computed: {
    smallDevice() {
      return window.outerWidth < 575 ? true : false
    },
    breadCrumb() {
      let list = this.$route.path.replace('/', '').split('/');

      let link = [];
      let path = '';

      for (let name of list) {
        let pair = {};
        path = path + '/' + name;
        pair['name'] = name;
        pair['path'] = path;
        link.push(pair);
      }
      return link
    },
    retourLink() {
      let link = Object.values(this.breadCrumb)[Object.keys(this.breadCrumb).length-2].path;
      return link
    }
  },
  methods: {
    breadName(name, index) {
      let props = this.$route.params.participation;
      let text = decodeURIComponent(name);

      if (props && (index == Object.keys(this.breadCrumb).length-1)) {
        return 'Participation'
      } else {
        return text
      }
    },
    lastBreadClass(index) {
      if (index == Object.keys(this.breadCrumb).length-1) {
        return 'disabled'
      }
    },
    listenScroll() {
      setTimeout(() => {
        document.querySelector('#app').addEventListener(
          'scroll',
          () => { this.breadCrumbHide(event) },
          { once: true }
        );
      }, 100);
    },
    breadCrumbHide(event) {
      let bc = document.querySelector('.breadCrumb');

      if (event.target.scrollTop > this.scrollPos) bc.style.marginTop = '-' + bc.scrollHeight + 'px'
      else bc.style.marginTop = 0;

      this.scrollPos = event.target.scrollTop;
      this.listenScroll()
    }
  },
  mounted() {
    this.listenScroll()
  }
}
</script>

<style lang="scss" scoped>
.container-fluid * {
  position: relative; //Pour que les objets apparaissent sous les autres
  & .ripple {
    display: none;
  }
}

.innerNav {
  position: absolute;
  right: 0;
  margin: 1rem;
}
.outerNav {
  position: absolute;
  margin: 0.5rem;
}
</style>