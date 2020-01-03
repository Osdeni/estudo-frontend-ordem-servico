<template>
  <div class="ordemServico container-fluid">
    <h1>Ordens de Serviço</h1>

    <div class="submenu-bar">
      <router-link
        :to="{name: 'ordem-servico-add'}"
        class="btn btn-primary col-sm-12 col-md-2"
        v-if="permissao.btn.addOrdemServico"
      >Cadastrar</router-link>
    </div>

    <!-- TODO componentizar -->
    <ul class="alert alert-danger" v-show="erros.length > 0">
      <li v-for="erro in erros">{{ erro }}</li>
    </ul>

    <ordem-servico-filtro @filtrar="filtrar" @erros="errosFiltros"></ordem-servico-filtro>

    <hr />

    <!-- TORNAR componente a listagem ou sem dados -->
    <div class="card">
      <div class="card-header">Resultados</div>
      <div class="card-body">
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
              <tr v-for="os in ordensServicos.content" @click="abrirDetalhes(os.id)">
                <th scope="row">{{ os.id }}</th>
                <td>{{ os.cliente.nome }}Otto</td>
                <td>{{ os.tipo.descricao }}</td>
                <td>{{ os.marca.descricao }}</td>
                <td>{{ new Date(os.dataAbertura).toLocaleDateString() }}</td>
                <td class="text-center">
                  <status-badge :status="os.status" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrdemServicoFiltro from "./OrdemServicoFiltro";
import StatusBadge from "./StatusBadge";
import roles from '@/modules/auth/roles.js';

export default {
  name: "OrdemServico",
  data: function() {
    return {
      isProcessando: false,
      erros: [],
      permissao: {
        btn: {
          addOrdemServico: false
        }
      }
    };
  },
  components: {
    OrdemServicoFiltro, StatusBadge
  },
  async mounted() {
    this.isPermissoes();
    await this.getOrdemServicos();
  },
  computed: {
    ...mapState("ordemServico", ["ordensServicos"]),
  },
  methods: {
    ...mapActions("ordemServico", ["ActionFindOrdemServicos"]),
    ...mapActions("auth", ["ActionCheckIsRole"]),
    getOrdemServicos(form) {
      this.isProcessando = true;
      this.erros.length = 0;

      this.ActionFindOrdemServicos(form)
        .catch(err => {
          this.erros.push("Ocorreu um erro inesperado");
          console.log(err);
        })
        .finally(() => {
          this.isProcessando = false;
        });
    },
    filtrar(form) {
      this.getOrdemServicos(form);
    },
    errosFiltros(erro) {
      this.erros.push(erro);
    },
    abrirDetalhes(id) {
      this.$router.push({ name: 'ordem-servico-detalhe', params: {id: id} });
    },
    isPermissoes() {
        this.ActionCheckIsRole([roles.ATENDIMENTO])
        .then((res) => {
          this.permissao.btn.addOrdemServico = res;
        })
    }
  }
};
</script>

<style scoped>
.submenu-bar {
  margin-bottom: 10px;
}
</style>