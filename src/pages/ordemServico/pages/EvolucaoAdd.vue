<template>
  <form @submit.prevent="submit()">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Cadastrar Evolução</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- TODO componentizar -->
        <ul class="alert alert-danger" v-show="erros.length > 0">
          <li v-for="erro in erros">{{ erro }}</li>
        </ul>

        <div class="form-group">
          <label for="tipo">Descrição</label>
          <input type="text" v-model="form.descricao" name="descricao" class="form-control" />
        </div>

        <div class="form-group">
          <label for="tipo">Status</label>
          <select v-model="form.status" name="status" class="form-control">
            <option></option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>

        <!-- TODO componentizar -->
        <button
          type="submit"
          class="btn btn-primary"
          :class="{ disabled: isProcessando }"
          :disabled="isProcessando"
        >{{ getTitulo() }}</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "OrdemServicoEvolucao",
  data() {
    return {
      erros: [],
      isProcessando: false,
      form: {
        descricao: "",
        status: ""
      }
    };
  },
  computed() {
    console.log(this.name);
    // TODO validar 1 ou outro
  },
  methods: {
    getTitulo() {
      return this.isProcessando ? "Processando.." : "Salvar";
    }
  }
};
</script>