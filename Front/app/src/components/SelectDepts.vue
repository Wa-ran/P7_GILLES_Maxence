<template>
  <div class="d-flex has-icon w-100">
    <mdb-icon far icon="address-card" size="2x" class="my-auto prefix"/>
    <select 
    name="departement"
    class="custom-select" @change="styleBold"
    aria-labelledby="selectLabel" required>
      <option selected disabled value="" id="selectLabel">Sélectionnez votre service</option>
      <option v-for="(dept, index) in deptsList" 
      :value="dept" :key="index">
        {{ dept }}
      </option>
    </select>
  </div>
</template>

<script>
import mdbIcon from 'mdbvue/lib/components/mdbIcon';

export default {
  name: 'SelectDepts',
  components : {
    mdbIcon
  },
  computed: {
    deptsList() {
      return this.$store.state.depts
    }
  },
  methods: {
    styleBold($event) { // JS car css ne suffit pas pour changer le style de select
      $event.target.style.fontWeight = 'bold';
    }
  },
  mounted() {
    this.$store.dispatch('GPMRequest', { backFct: 'DeptsList' });
    if (this.$store.state.profil.departement) {
      setTimeout(() => {
      document.querySelector('select').style.fontWeight = 'bold';
      document.querySelector("option[value='"+ this.$store.state.profil.departement +"']").setAttribute('selected', 'selected');
      }, 200)
    }
  }
}
</script>