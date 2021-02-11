<script>
export default {
  name: 'Wrap',
  props: {
    tag: {
      value: String,
      required: false,
      default: 'div'
    },
    withComp: {
      value: String,
      required: false
    },
    withTag: {
      value: String,
      required: false,
      default: 'div'
    }
  },
  // data() {
  //   return {
  //     wrapper: 'div',
  //   }
  // },
  computed: {
    wrapper() {
      let choice;
      if (this.withComp) {
        choice = () => ({
          component: import('./' + this.withComp),
          loading: this.withComp,
          delay: 0
        }) 
      } else {
        choice = this.withTag
      }
      return choice
    }
  },
  // mounted() {
  //   let choice;
  //   if (this.withComp !== undefined) {
  //     choice = () => ({
  //       component: import('./' + this.withComp),
  //       loading: this.withComp,
  //       delay: 0
  //     })
  //   } else {
  //     choice = this.withTag
  //   }
  //   return this.wrapper = choice
  // },
  // render: function(createElement){
  //   var list = []
  //   this.$slots.default.forEach((element, index) => {
  //     if(element.tag){
  //       list.push(createElement('blockSlide',{attrs: {'num': index}},[element]))
  //     }
  //   });
  //   return createElement('div',{},list)
  // }
  render: function(createElement){
    let self = this;
    return createElement(this.tag,
      this.$slots.default.map(function(element, index) {
        return createElement(self.wrapper,{ attrs: {'number': index }},[element])
      })
    )
  }
}
</script>