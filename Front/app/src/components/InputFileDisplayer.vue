<template>
  <div>
    <div class="mt-3 custom-control custom-switch">
      <input type="checkbox" class="custom-control-input" id="image" name="image" v-model="hasImage">
      <label class="custom-control-label" for="image">Insérer une image</label>
    </div>

    <div v-show="hasImage">
      <InputFile/>
    </div>
  </div>
</template>

<script>
import InputFile from '@/components/InputFile.vue';

export default {
  name: 'InputFileDisplayer',
  components: {
    InputFile
  },
  data() {
    return {
      hasImage: false
    }
  },
}
</script>