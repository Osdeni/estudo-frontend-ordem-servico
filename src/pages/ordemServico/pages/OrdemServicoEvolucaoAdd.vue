<template>
  <form @submit.prevent="submit()" novalidate="true">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Cadastrar Evolução</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <erros :erros="erros" />

        <div class="form-group" :class="{ 'hasError': $v.form.status.$error }">
          <label for="tipo">Status</label>
          <select v-model="form.status" name="status" class="form-control">
            <option selected disabled value>Selecione uma opção</option>
            <option v-for="os in ordemServicosPossiveis" :value="os.index">{{ os.label }}</option>
          </select>
        </div>

        <div class="form-group" :class="{ 'hasError': $v.form.descricao.$error }">
          <label for="tipo">Descrição</label>
          <input
            type="text"
            v-model="form.descricao"
            name="descricao"
            class="form-control"
            maxlength="254"
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
</template>

<script>
import { mapActions, mapState } from "vuex";
import Status from "./../status";
import { EventBus } from "@/main";
import { required, requiredIf } from "vuelidate/lib/validators";
import Erros from "@/components/Erros";

export default {
  name: "OrdemServicoEvolucao",
  validations: {
    form: {
      descricao: {
        required: requiredIf(function(m) {
          return m.status == "" || m.status == null;
        })
      },
      status: {
        required: requiredIf(function(m) {
          return m.descricao == "" || m.descricao == null;
        })
      }
    }
  },
  components: {
    Erros
  },
  data() {
    return {
      erros: [],
      isProcessando: false,
      form: this.initData(),
      ordemServicosPossiveis: []
    };
  },
  mounted() {
    var self = this;
    $("#modalEvolucao").on("show.bs.modal", function(e) {
      self.clearData();
      self.$v.form.$reset;
      self.erros.length = 0;
    });

    this.getListStatus();
  },
  computed: {
    ...mapState("ordemServico", ["ordemServicosStatus", "ordemServicoEvolucao"])
  },
  methods: {
    ...mapActions("ordemServico", [
      "ActionListOrdemServicosStatus",
      "ActionAddEvolucao"
    ]),
    initData() {
      return {
        descricao: "",
        status: null
      };
    },
    clearData() {
      this.form = this.initData();
    },
    getTitulo() {
      return this.isProcessando ? "Processando.." : "Salvar";
    },
    async getListStatus() {
      this.isProcessando = true;

      await this.ActionListOrdemServicosStatus()
        .then(() => {
          // elimina a de abertura
          this.ordemServicosPossiveis = this.ordemServicosStatus.filter(
            status => {
              return status.index != Status.ABERTO;
            }
          );
        })
        .catch(err => {
          console.log(err);
          this.erros.push("Erro ao carregar os status");
        })
        .finally(() => {
          this.isProcessando = false;
        });
    },
    async submit() {
      this.erros.length = 0;

      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.erros.push("Favor verificar os campos obrigatórios");
      } else {
        this.isProcessando = true;
        this.ActionAddEvolucao(Object.assign({}, this.form))
          .then(() => {
            EventBus.$emit("statusAdicionado", this.ordemServicoEvolucao);

            this.$toast.open({
              position: "top",
              message: "Evolução adicionada com sucesso",
              type: "success"
            });
            $("#modalEvolucao").modal("hide");
          })
          .catch(err => {
            console.log(err);
            this.erros.push("Erro ao salvar a evolução");
          })
          .finally(() => {
            this.isProcessando = false;
          });
      }
    }
  }
};
</script>