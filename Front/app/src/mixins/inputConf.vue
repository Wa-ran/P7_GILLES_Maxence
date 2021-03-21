<script>
export default {
  name:"inputConf",
  methods: {
    inputConf(event, cible, reverse = false) {
      let error = reverse ? "Ne doit pas être identique" : "Ne correspond pas" ;
      let model = document.getElementById(cible);
      if (reverse ? event.target.value === model.value : event.target.value !== model.value) {
        event.target.setCustomValidity(error);
        model.setCustomValidity(error);
        var nextSibling = event.target.nextSibling;
        while (nextSibling) {
          if (
            nextSibling.nodeType == Node.ELEMENT_NODE
          && nextSibling.classList.contains('invalid-feedback')
          ) {
            nextSibling.textContent = error;
            break;
          }
          nextSibling = nextSibling.nextSibling;
        }
      }
      else {
        event.target.setCustomValidity("");
        model.setCustomValidity("");
      }
    }
  }
}
</script>