<template>
  <mdb-btn outline="purple" class="mx-2 px-3 py-1" darkWaves block>
    <router-link :to="path" class="font-weight-bold purple-text text-capitalize">{{ pathName }}</router-link>
  </mdb-btn>
</template>

<script>
export default {
  name: "MainNavButton",
  props: {
    Name: String,
    path: String
  }
}
</script>