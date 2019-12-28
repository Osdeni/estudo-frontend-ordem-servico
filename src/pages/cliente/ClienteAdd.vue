<template>
  <div>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Cadastrar Clientes</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Aqui mesmo, é só dale
        <form>
          <input v-model="form.nome" name="nome" type="text" />
          {{ form.nome }}
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary" @click="salvar()">Salvar mudanças</button>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/main";

export default {
  name: "cliente",
  data() {
    return {
      form: {
        id: 10,
        nome: ""
      }
    };
  },
  mounted() {
    console.log("montando clientes");
  },
  methods: {
    async salvar() {
      $("#modalClientes").modal("hide");

      // TODO AQUI
      // TODO cadastra, pega o 201 e os dados do cliente e passa no evento.

      EventBus.$emit("clienteCadastrado", this.form);
    }
  }
};
</script>