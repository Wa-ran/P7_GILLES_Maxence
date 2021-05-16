<template>
  <div v-if="needScroll" id="ButtonScroll" class="d-flex flex-column z-depth-1 zind10">
    <mdbBtn id="scrollUp"
    v-show="!pageUp"
    @click="scrollUp"
    class="m-0 px-3 py-1 z-depth-0 gpm-attention gpm-warning-active">
      <i class="fas fa-chevron-up fa-lg"></i>
    </mdbBtn>
    <mdbBtn id="scrollDown"
    v-show="!pageDown"
    @click="scrollDown"
    class="m-0 px-3 py-1 z-depth-0 gpm-attention gpm-warning-active">
      <i class="fas fa-chevron-down fa-lg"></i>
    </mdbBtn>
  </div>
</template>

<script>
import mdbBtn from 'mdbvue/lib/components/mdbBtn';

export default {
  name: 'ButtonScroll',
    components: {
    mdbBtn
  },
  data() {
    return {
      needScroll: false,
      pageUp: true,
      pageDown: false
    }
  },
  computed: {
    route() {
      return this.$route.path
    }
  },
  methods: {
    btnScroll() {
      if (document.getElementById('app').scrollTop < 100) this.pageUp = true
      else this.pageUp = false

      if ((document.getElementById('app').scrollTop > (document.getElementById('app').scrollHeight - document.getElementById('app').offsetHeight) - 100 )) this.pageDown = true
      else this.pageDown = false

      this.listenScroll()
    },
    scrollUp() {
      document.getElementById('app').scrollTop = 0
    },
    scrollDown() {
      document.getElementById('app').scrollTop = (document.getElementById('app').scrollHeight - document.getElementById('app').offsetHeight)
    },
    listenScroll() {
      setTimeout(() => {
        document.getElementById('app').addEventListener(
          'scroll',
          () => {
            setTimeout(() => {
              this.btnScroll() 
            }, 200)
          },
          { once: true }
        );
      }, 100);
    }
  },
  mounted() {
    this.listenScroll()
  },
  watch: {
    route() {
      setTimeout(() => {
        if (document.getElementById('app').scrollHeight > (2 * document.getElementById('app').offsetHeight)) this.needScroll = true
        else this.needScroll = false        
      }, 400)
    }    
  }
}
</script>

<style lang="scss" scoped>
#ButtonScroll {
  width: fit-content !important;
}
#scrollDown, #scrollUp {
box-shadow: inset 0 -2px 2px 0 rgba(0,0,0, 0.1), inset 0 2px 2px 0 rgba(255,255,255, 0.1) !important;
}
</style>