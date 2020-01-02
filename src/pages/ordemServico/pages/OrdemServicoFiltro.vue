<template>
  <div class>
    <div class="card">
      <div class="card-header">Pesquisa</div>
      <div class="card-body">
        <form @submit.prevent="submit()" class="form-row">
          <div class="col-md-4">
            <label class for="status">Status</label>
            <select
              class="form-control mb-2 mr-sm-2"
              id="status"
              name="status"
              v-model="form.status"
            >
              <option value>Todos</option>
              <option :value="st.index" v-for="st in ordemServicosStatus">{{ st.label }}</option>
            </select>
          </div>

          <div class="col-md-8">
            <label class for="responsavel">Responsável</label>

            <select
              type="text"
              class="form-control"
              id="responsavel"
              v-model="form.responsavel"
              placeholder="Nome do Responsavel"
            >
              <option disabled selected valud="">Seleciona uma opção</option>
              <option v-for="resp in responsaveis" :value="resp.id">{{ resp.nome }}</option>
            </select>
          </div>

          <div class="col-xs-12 offset-md-10 col-md-2">
            <button type="submit" class="btn btn-secondary btn-block align-right">Buscar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "OrdemServicoFiltro",
  erros: [],
  data() {
    return {
      form: {
        status: "",
        responsavel: ""
      }
    };
  },
  created() {
    this.getListStatus();
    this.getListResponsaveis();
  },
  computed: {
    ...mapState("ordemServico", ["ordemServicosStatus"]),
    ...mapState("cliente", ["responsaveis"])
  },
  methods: {
    ...mapActions("ordemServico", ["ActionListOrdemServicosStatus"]),
    ...mapActions("cliente", ["ActionFindResponsaveis"]),
    submit() {
      this.$emit("filtrar", this.form);
    },
    getListStatus() {
      this.ActionListOrdemServicosStatus().catch(err => {
        this.$emit("erros", "Erro ao recuperar status de ordens de serviços");
      });
    },
    async getListResponsaveis() {
      await this.ActionFindResponsaveis().catch(err => {
        this.$emit("erros", "Erro ao recuperar os responsáveis");
      });
    }
  }
};
</script>