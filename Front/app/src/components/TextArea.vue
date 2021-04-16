<template>
  <mdb-input
  @focus="setEvent"
  class="d-flex flex-column input-group textarea"
    :class="this.hasClass"
    :id="this.id" :name="this.name" :label="this.label"
    type="textarea"
    required>
  </mdb-input>
</template>

<script>
import mdbInput from 'mdbvue/lib/components/mdbInput';

import resizeAuto from '@/mixins/resizeAuto';

export default {
  name: 'TextArea',
  components: { mdbInput },
  props: {
    hasClass: {
      type: String,
      default: ''
    },
    id: String,
    name: String,
    label: String,
  },
  methods: {
    setEvent() {
      document.querySelectorAll('textarea').forEach((textarea) => {
        textarea.addEventListener('keydown', this.handleTextArea)
      });
    },
    handleTextArea(event) {
      if (event.target.tagName === 'TEXTAREA') {
        this.$nextTick(() => {
          event.target.style.minHeight = 0;
          event.target.style.minHeight = event.target.scrollHeight + 'px'
        });
        if (event.key === 'Enter') {
          this.addLine(event)
        }
      }
    },
    addLine(event) {
      event.target.value = event.target.value + "\n"
    }
  },
  beforeDestroy() {
    document.querySelectorAll('textarea').forEach((textarea) => {
      textarea.removeEventListener('keydown', this.handleTextArea)
    });
  },
  mixins: [ resizeAuto ]
}
</script>