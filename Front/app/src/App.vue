<template>
  <div id="app" class="w-100 d-flex flex-column position-absolute page">
    <router-view name="MainNav" class="zind10 dessus"/>
    <router-view class="w-100 h-100 flex-grow-1"/>
    <router-view name="Footer" class="w-100"/>

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
        commentaires: [],
        depts: [],
        error: false,
        errorMsg: '',
        errorStatus: '',
        form: {
          backFct: null,
          submitPath: null
        },
        groupe: {},
        groupeList: [],
        headers: {},
        lastAnnonce: {},
        loading: true,
        participationInfos: {},
        profil: {},
        token: null,
      })
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
  }
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
  overflow: scroll;
}
.dessus {
  position: relative;
}
.page {
  min-height: 100%;
  max-height: 100%;
}
</style>
