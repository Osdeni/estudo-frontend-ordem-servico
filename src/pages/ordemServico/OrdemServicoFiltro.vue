<template>
  <div class>
    <div class="card">
      <div class="card-header">
        Pesquisa
      </div>
      <div class="card-body">
        <form @submit.prevent="submit()" class="form-row">
          <div class="col-md-12">
            <label class for="inlineFormInputName2">Status</label>
            <select class="form-control mb-2 mr-sm-2" name="status" v-model="form.status">
              <option value>Todos</option>
              <option :value="st.index" v-for="st in ordemServicosStatus">{{ st.label }}</option>
            </select>
          </div>

          <div class="col-xs-12 offset-md-10 col-md-2">
            <button
              type="submit"
              class="btn btn-secondary btn-block align-right"
            >Buscar</button>
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
        responsavel: null
      }
    };
  },
  created() {
    this.getListStatus();
  },
  computed: {
    ...mapState('ordemServico', ['ordemServicosStatus'])
  },
  methods: {
    ...mapActions('ordemServico', ['ActionListOrdemServicosStatus']),
    submit() {
      this.$emit("filtrar", this.form);
    },
    getListStatus() {
      this.ActionListOrdemServicosStatus()
      .catch(err => {
        this.$emit("erros", "Erro ao recuperar status de ordens de serviços");
      })
    }
  }
};
</script>