<script>
export default {
  methods: {
    setError(pw) {
      if (!pw.match(/[a-z]/g)) {
        return 'Au moins une minuscule'
      }
      else if (!pw.match(/[A-Z]/g)) {
        return 'Au moins une majuscule'
      }
      else if (!pw.match(/[0-9]/g)) {
        return 'Au moins un chiffre'
      }
      else if (!pw.match(/[^a-zA-Z\d]/g)) {
        return 'Au moins un caractère spécial'
      }
      else if (pw.length < 8) {
        return 'Au moins 8 caractère'
      }
      else {
        return ''
      }
    },
    checkPassword(input) {
      const custError = this.setError(input.value);
      input.setCustomValidity(custError);
      var nextSibling = input.nextSibling;
      while (nextSibling) {
        if (
          nextSibling.nodeType == Node.ELEMENT_NODE
        && nextSibling.classList.contains('invalid-feedback')
        ) {
          nextSibling.textContent = custError;
          break;
        }
        nextSibling = nextSibling.nextSibling;
      }
    },
    mounted() {
      document.querySelectorAll("[type='password']").forEach(pass => {
        addEventListener('change', this.checkPassword(pass))
      })
    },
    beforeDestroy() {
      document.removeEventListener('change', this.checkPassword)
    },
  }
}
</script>