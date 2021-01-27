<template>
  <mdb-btn outline="black" class="mx-2 my-1 px-3 py-1 red lighten-4" darkWaves block>
    <mdb-stretched-link tag="router-link" :to="path" class="font-weight-bold black-text text-capitalize">{{ text }}</mdb-stretched-link>
  </mdb-btn>
</template>

<script>
import { mdbBtn, mdbStretchedLink } from 'mdbvue';

export default {
  name: "MainButton",
  components: {
    mdbBtn,
    mdbStretchedLink
  },
  props: {
    text: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
button {
  max-width: 45%;
  & a {
    font-size: 1.25rem;
  }
}
</style>