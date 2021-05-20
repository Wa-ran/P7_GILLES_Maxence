<template>
  <div>
    <div class="mt-3 w-100 custom-file">
      <input type="file" class="w-100 custom-file-input" id="file" name="file" 
      autofocus
      accept="image/jpg,image/jpeg,image/pdf,image/png,image/webp"
      @change="filePreview">
      <label class="w-100 text-left custom-file-label" for="file">
        {{ file ? file : 'Votre image' }}
      </label>
    </div>

    <img v-if="url" :src="url"
    id="preview" alt="Votre nouvelle PP."
    class="mx-auto mt-3 w-75 z-depth-1 rounded"/>
  </div>
</template>

<script>
export default {
  name: 'InputFile',
  data() {
    return {
      url: null,
      file: null
    }
  },
  methods: {
    filePreview(event) {
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
      let value = event.target.value;
      this.file = value.substring(value.lastIndexOf('\\') + 1);
      this.$emit('img_selected')
    }
  }
}
</script>