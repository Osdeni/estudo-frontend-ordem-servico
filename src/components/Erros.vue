<template>
  <div>
    <div v-show="erros.length > 0">
      <ul class="alert alert-danger">
        <li v-for="erro in erros">{{ erro }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Erros",
  props: {
    erros: {
      required: true
    }
  }
};
</script>