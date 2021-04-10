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
    checkPassword(event) {
      let pass = event.target;
      const custError = this.setError(pass.value);
      pass.setCustomValidity(custError);
      var nextSibling = pass.nextSibling;
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
    }
  },
  mounted() {
    window.onload = () => { // Attendre le chargement complet car le Mainform est construit avant le formulaire
      document.querySelectorAll("[type='password']").forEach(pass => {
        pass.addEventListener('change', this.checkPassword)
      })      
    }
  },
  beforeDestroy() {
    document.querySelectorAll("[type='password']").forEach(pass => {
      pass.removeEventListener('change', this.checkPassword)
    })
  }
}
</script>