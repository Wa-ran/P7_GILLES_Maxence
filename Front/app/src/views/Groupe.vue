<template>
  <TitleDoc :color="'gpm-default'">

    <template #title>
      <h2 class="h4 m-1">
        Groupe
      </h2>
    </template>

    <template>
      <wrap withComp="AnimBlockSlide" class="w-100">

        <div v-if="this.$route.path == '/home/groupe'" class="w-100">
          <GroupePreview
          v-for="groupe of groupeList" :key="groupe.nom"
          class="w-100 gpm-lecture"
          :btnColor="'gpm-attention gpm-warning-active'"
          :hr="'m-0 gpm-grey w-100'">

            <template #name>
              <h3 class="mx-auto mb-2 pb-0 h4">
                <router-link :to="'/home/groupe/' + groupe.nom">
                  {{ groupe.nom }}
                </router-link>
              </h3>
            </template>

            <template #description>
              <div class="mt-2">
                {{ groupe.description }}
              </div>
            </template>
          </GroupePreview>
        </div>

      </wrap>
    </template>
  </TitleDoc>
</template>

<script>
import GroupePreview from '@/components/GroupePreview';
import TitleDoc from '@/components/TitleDoc';
import Wrap from '@/components/Wrap';

export default {
  name: 'Groupe',
  components: {
    GroupePreview,
    TitleDoc,
    Wrap
  },
  computed: {
    groupeList() {
      return this.$store.state.groupeList
    }
  },
  async created() {
    await this.$store.dispatch('GPMRequest', { backFct: 'groupeList' })
    .catch(error => console.log(error));
  },
}
</script>