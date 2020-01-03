<template>
  <div>
    <form @submit.prevent="submit()" novalidate="true">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cadastrar Cliente</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <erros :erros="erros" />

          <div class="form-group" :class="{ 'hasError': $v.form.nome.$error }">
            <label for="tipo">Nome</label>
            <input type="text" v-model="form.nome" name="nome" class="form-control" required />
          </div>

          <div class="form-group" :class="{ 'hasError': $v.form.email.$error }">
            <label for="tipo">E-mail</label>
            <input type="email" v-model="form.email" name="email" class="form-control" required />
          </div>

          <div class="form-group" :class="{ 'hasError': $v.form.telefone.$error }">
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

          <div class="form-group" :class="{ 'hasError': $v.form.endereco.$error }">
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
import { required, email } from "vuelidate/lib/validators";
import Erros from "@/components/Erros";

export default {
  name: "cliente",
  validations: {
    form: {
      nome: { required },
      email: { required, email },
      telefone: { required },
      endereco: { required }
    }
  },
  components: {
    Erros
  },
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
      this.erros.length = 0;

      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.erros.push("Favor verificar os campos obrigatórios");
      } else {
        this.isProcessando = true;
        await this.ActionAddCliente(this.form)
          .then(res => {
            EventBus.$emit("clienteCadastrado", res.data);
            $("#modalClientes").modal("hide");
          })
          .catch(err => {
            this.erros.push("Erro ao salvar cliente");
            this.erros.push(err.data.erro);
          })
          .finally(() => {
            this.isProcessando = false;
          });
      }
    }
  }
};
</script>