<template>
  <img v-show="!noImg"
    :src="source"
    :alt="textAlt"
    :class="imgClass ? imgClass :'mx-auto mt-3 w-auto mw-100 z-depth-1 rounded'"
    @error="noImg = true"/>
</template>

<script>
export default {
  name: 'ImageShow',
  props: {
    source: String, 
    textAlt: String,
    imgClass: String
  },
  data() {
    return {
      noImg: false
    }
  }
}
</script>