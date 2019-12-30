<template>
  <div class="ordemServico container-fluid">
    <h1>Ordens de Serviço</h1>

    <div class="submenu-bar">
        <router-link :to="{name: 'ordem-servico-add'}" class="btn btn-primary col-sm-12 col-md-2">Cadastrar</router-link>
    </div>

    <!-- TORNAR componente a listagem ou sem dados -->
    <div class="table-responsive">
      <p v-show="isProcessando">Aguarde, carregando..</p>

      <p v-show="ordensServicos.totalElements === 0">Nenhuma ordem de seviço encontrada</p>

      <table class="table table-striped" v-show="ordensServicos.totalElements > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Cliente</th>
            <th scope="col">Tipo</th>
            <th scope="col">Marca</th>
            <th scope="col">Dt. Abertura</th>
            <th scope="col" class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="os in ordensServicos.content">
            <th scope="row">{{ os.id }}</th>
            <td>{{ os.cliente.nome }}Otto</td>
            <td>{{ os.tipo.descricao }}</td>
            <td>{{ os.marca.descricao }}</td>
            <td>{{ new Date(os.dataAbertura).toLocaleDateString() }}</td>
            <td class="text-center">
              <span class="badge" :class="os.status.cssClass">{{ os.status.label }}</span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "OrdemServico",
  data: function() {
    return {
      isProcessando: false
    };
  },
  async mounted() {
    this.isProcessando = true;
    await this.ActionFindOrdemServicos()
      .catch(err => {
        alert("Ocorreu um erro inesperado");
        console.log(err);
      })
      .finally(() => {
        this.isProcessando = false;
      });
  },
  computed: {
    ...mapState("ordemServico", ["ordensServicos"])
  },
  methods: {
    ...mapActions("ordemServico", ["ActionFindOrdemServicos"])
  }
};
</script>

<style scoped>
.submenu-bar {
    margin-bottom: 10px;
}
</style>