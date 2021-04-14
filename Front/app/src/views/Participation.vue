<template>
  <div>
    <mdb-card class="mb-3 gpm-default">

      <div class="p-3 w-100">
        <h2 class="h5 m-1">
          {{ infos.titre }}
        </h2>      
      </div>

      <hr class="mt-0 mb-2 mx-auto w-75 black">

      <mdb-card-body class="rounded">
        <div class="h6 p-3">
          {{ infos.preview }}
        </div>
      </mdb-card-body>

    </mdb-card>

    <mdb-card class="mb-3 gpm-lecture">
      <mdb-card-body class="p-2 gpm-lecture rounded text-left">
        {{ infos.article }}
      </mdb-card-body>
    </mdb-card>

    <mdb-card class="mb-3 gpm-lecture">
      <mdb-card-body class="p-2 gpm-lecture rounded text-left">
        {{ this.$route.params.participation }}
      </mdb-card-body>
    </mdb-card>

    <mdb-card class="mb-3 gpm-lecture">
      <mdb-card-body class="p-2 gpm-lecture rounded text-left">
        {{ this.$route.params.participation }}
      </mdb-card-body>
    </mdb-card>

    <mdb-card class="mb-3 gpm-lecture">
      <mdb-card-body class="p-2 gpm-lecture rounded text-left">
        {{ this.$route.params.participation }}
      </mdb-card-body>
    </mdb-card>

    <mdb-card class="mb-3 gpm-lecture">
      <mdb-card-body class="p-2 gpm-lecture rounded text-left">
        {{ this.$route.params.participation }}
      </mdb-card-body>
    </mdb-card>

  </div>
</template>

<script>
import mdbCard from 'mdbvue/lib/components/mdbCard';
import mdbCardBody from 'mdbvue/lib/components/mdbCardBody';

export default {
  name: 'Participation',
  components: {
    mdbCard,
    mdbCardBody
  },
  props: ['groupeName', 'participation'],
  computed: {
    infos() {
      return this.$store.state.participation
    }
  },
  methods: {
    async content() {
      await this.$store.dispatch('GPMRequest', { backFct: 'getParticipation', data: this.participation })
      .catch(error => console.log(error));      
    },
    async post() {
      await this.$store.dispatch('GPMRequest', { backFct: 'postCommentaire' })
      .catch(error => console.log(error));      
    }
  },
  async created() {
    await this.content()
  }
}
</script>