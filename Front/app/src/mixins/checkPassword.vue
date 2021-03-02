<script>
export default {
  methods: {
    checkPassword(pw) {
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
    }
  }
}
</script>