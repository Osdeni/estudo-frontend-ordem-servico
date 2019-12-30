<template>
  <div>
    <form @submit.prevent="submit()">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cadastrar Cliente</h5>
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
            <label for="tipo">Nome</label>
            <input type="text" v-model="form.nome" name="nome" class="form-control" required />
          </div>

          <div class="form-group">
            <label for="tipo">E-mail</label>
            <input type="email" v-model="form.email" name="email" class="form-control" required />
          </div>

          <div class="form-group">
            <label for="tipo">Telefone</label>
            <input
              type="text"
              v-model="form.telefone"
              name="telefone"
              class="form-control"
              required
              v-mask="'(##)#####-####'"
            />
          </div>

          <div class="form-group">
            <label for="tipo">Endereço</label>
            <input
              type="text"
              v-model="form.endereco"
              name="endereco"
              class="form-control"
              required
            />
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { EventBus } from "@/main";
import { mask } from "vue-the-mask";

export default {
  name: "cliente",
  data() {
    return {
      erros: [],
      isProcessando: false,
      form: this.initData()
    };
  },
  directives: { mask },
  mounted() {
    var self = this;
    $("#modalClientes").on("show.bs.modal", function(e) {
      self.clearData();
    });
  },
  methods: {
    ...mapActions("cliente", ["ActionAddCliente"]),
    initData() {
      return {
        nome: "",
        email: "",
        telefone: "",
        endereco: ""
      };
    },
    clearData() {
      this.form = this.initData();
    },
    getTitulo() {
      return this.isProcessando ? "Processando.." : "Salvar";
    },
    async submit() {
      this.isProcessando = true;
      this.erros.length = 0;

      await this.ActionAddCliente(this.form)
        .then(res => {
          EventBus.$emit("clienteCadastrado", res.data);
          $("#modalClientes").modal("hide");
        })
        .catch(err => {
          this.erros.push("Erro ao salvar cliente");
        })
        .finally(() => {
          this.isProcessando = false;
          console.log("finally");
        });

      //

      // TODO validação
      // TODO cadastra, pega o 201 e os dados do cliente e passa no evento.

      //
    }
  }
};
</script>