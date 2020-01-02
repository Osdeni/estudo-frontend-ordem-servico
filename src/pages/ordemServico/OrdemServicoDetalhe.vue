<template>
  <div class="ordemServico container-fluid">
    <h1>Ordens de Serviço - Detalhes</h1>

    <div class="submenu-bar">
      <router-link :to="{name: 'ordem-servico'}" class="btn btn-primary col-sm-12 col-md-2">Voltar</router-link>
    </div>

    <!-- TORNAR componente a listagem ou sem dados -->
    <div class="card">
      <div class="card-header">Detalhes</div>
      <div class="card-body">
        <div class="table-responsive">
          <p v-show="isProcessando">Aguarde, carregando..</p>

          <!-- TODO componentizar -->
          <ul class="alert alert-danger" v-show="erros.length > 0">
            <li v-for="erro in erros">{{ erro }}</li>
          </ul>

          <p v-show="!isDados()">Nenhuma ordem de seviço encontrada</p>

          <div class="table-responsive">
            <table class="table table-striped" v-show="isDados()">
              <tbody>
                <tr>
                  <th scope="col">#</th>
                  <th scope="row">{{ ordemServico.id }}</th>
                </tr>
                <tr>
                  <th>Cliente</th>
                  <td>{{ ordemServico.cliente.nome }}</td>
                </tr>
                <tr>
                  <th>Tipo</th>
                  <td>{{ ordemServico.tipo.descricao }}</td>
                </tr>
                <tr>
                  <th>Marca</th>
                  <td>{{ ordemServico.marca.descricao }}</td>
                </tr>
                <tr>
                  <th>Defeito</th>
                  <td>{{ ordemServico.defeito }}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <status-badge :status="ordemServico.status" />
                  </td>
                </tr>
                <tr>
                  <th>Data de abertura</th>
                  <td>{{ getDataAbertura() }}</td>
                </tr>
                <tr>
                  <th>Responsável</th>
                  <td>{{ ordemServico.responsavel.nome }}</td>
                </tr>

                <tr>
                  <th>Data de finalização</th>
                  <td>{{ getDataFinalizacao() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <evolucoes @alteracaoStatus="alteracaoStatus"></evolucoes>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import roles from '@/modules/auth/roles.js';
import Evolucoes from './OrdemServicoEvolucao';
import StatusBadge from "./StatusBadge";

export default {
  name: "OrdemServicoDetalhe",
  data() {
    return {
      isProcessando: false,
      id: this.$route.params.id,
      erros: []
    };
  },
  components: {
    Evolucoes, StatusBadge
  },
  mounted() {
    this.getServico(this.id)
  },
  computed: {
    ...mapState("ordemServico", ["ordemServico"])
  },
  methods: {
    ...mapActions("ordemServico", ["ActionFindOrdemServico", "ActionAlterarStatusOrdemServico"]),
    isDados() {
      return Object.entries(this.ordemServico).length === 0 ? false : true;
    },
    getServico(id) {
      this.isProcessando = true;
      this.ActionFindOrdemServico(id)
        .catch(err => {
          if (typeof err.data !== undefined && err.data.message !== undefined) {
            this.erros.push(err.data.message);
          } else {
            this.erros.push("Erro ao recuperar os dados da ordem de serviço");
          }
        })
        .finally(() => {
          this.isProcessando = false;
        });
    },
    getDataAbertura() {
        if (this.ordemServico.dataAbertura == null) {
        return "";
      }

      return new Date(this.ordemServico.dataAbertura).toLocaleDateString();
    },
    getDataFinalizacao() {
      if (this.ordemServico.dataFinalizacao == null) {
        return "-";
      }

      return new Date(this.ordemServico.dataFinalizacao).toLocaleDateString();
    },
    alteracaoStatus(novoStatus) {
      this.ActionAlterarStatusOrdemServico(novoStatus);
    }
  },
  watch: {
    $route(to, from) {
      this.getServico(to.params.id);
    }
  }
};
</script>