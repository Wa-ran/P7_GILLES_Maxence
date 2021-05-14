<template>
  <div id="app" class="w-100 d-flex flex-column position-absolute page">
    <router-view name="MainNav" class="zind10"/>
    <main class="container w-100 flex-grow-1 zind5">
      <router-view/>    
    </main>
    <router-view name="Footer" class="w-100 zind10"/>

    <ErrorModal/>

  </div>
</template>

<script>
import ErrorModal from "@/components/ErrorModal.vue"

export default {
  components: {
    ErrorModal
  },
  computed: {
    pathName() {
      return this.$route.name
    }
  },
  methods: {
    restart() {
      this.$store.replaceState({
        avatar: {
          big: '',
          mini: ''
        },
        commentaires: [],
        depts: [],
        error: {
          pending: false,
          msg: '',
          status: ''
        },
        form: {
          backFct: null,
          submitPath: null
        },
        groupe: {},
        groupeList: [],
        groupeMember: [],
        groupeCommSignaled: [],
        headers: {},
        lastAnnonce: {},
        loading: true,
        participationInfos: {},
        profil: {},
        token: null,
      })
    },
    footerPadding() { // Pour que le bas du contenu n'apparaisse pas sous le footer
      document.querySelector('#MainView :last-child').style.marginBottom = 3*document.querySelector('footer').scrollHeight + 'px'
    }
  },
  watch: {
    pathName() {
      if (this.pathName === 'accueil' ) {
        this.restart()
      }
    }
  },
  created() {
    if (this.pathName === 'accueil' ) {
      this.restart()
    }
  },
  updated() {
    this.footerPadding()
  },
}
</script>

<style lang="scss">

$image-path: '~@/../mdb/mdbvue/img'; // image path variable update
@import '~@/../mdb/mdbvue/scss/mdb-free.scss'; // main mdb scss free file
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'); // font import

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
}
.page {
  min-height: 100%;
  max-height: 100%;
}
</style>
