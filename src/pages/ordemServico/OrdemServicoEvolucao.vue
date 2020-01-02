<template>
  <div class="mt-3">
    <div class="card border-secondary">
      <div class="card-header">Evoluções</div>
      <div class="card-body">
        <button
          v-if="isShowBtnIniciar()"
          @click="statusIniciar()"
          class="btn btn-primary"
        >{{ getTituloBtnIniciar() }}</button>

        <!-- TODO componentizar -->
        <button
          v-if="isShowBtnAddEvolucao()"
          @click="abrirModalEvolucao()"
          class="btn btn-secondary"
        >Adicionar Observação / Status</button>

        <!-- TODO componentizar -->
        <ul class="alert alert-danger" v-show="erros.length > 0">
          <li v-for="erro in erros">{{ erro }}</li>
        </ul>

        <div class="table-responsive mt-3" v-show="isShowEvolucoes()">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Data</th>
                <th>Observação</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="evolucao in ordemServicoEvolucoes">
                <td>{{ getData(evolucao.data) }}</td>
                <td>{{ evolucao.descricao }}</td>
                <td>
                  <status-badge :status="evolucao.status" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalEvolucao"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalEvolucao"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Status from "./status";
import StatusBadge from "./StatusBadge";
import { EventBus } from "@/main";

export default {
  name: "OrdemServicoEvolucao",
  data() {
    return {
      isProcessando: false,
      erros: []
    };
  },
  components: {
    StatusBadge
  },
  created() {
    // intercepta o cadastro do cliente e atualiza no form de ordem de serviço
    EventBus.$off("statusAdicionado");
    EventBus.$on("statusAdicionado", evolucao => {
      this.atualizarStatus(evolucao);
    });
  },
  computed: {
    ...mapState("ordemServico", ["ordemServico", "ordemServicoEvolucoes", "ordemServicoEvolucao"]),
    ...mapState("auth", ["user"])
  },
  methods: {
    ...mapActions("auth", ["ActionCheckIsRole"]),
    ...mapActions("ordemServico", [
      "ActionAddEvolucao",
      "ActionListAllEvolucoes",
      "ActionAddEvolucaoDirect"
    ]),
    getTituloBtnIniciar() {
      return this.isProcessando ? "Processando.." : "Iniciar";
    },
    isShowBtnIniciar() {
      return (
        this.ordemServico.status.index == Status.ABERTO &&
        this.isUsuarioLogadoEhResponsavel()
      );
    },
    isShowBtnAddEvolucao() {
      return (
        this.ordemServico.status.index != Status.ABERTO &&
        this.isUsuarioLogadoEhResponsavel()
      );
    },
    isShowEvolucoes() {
      return this.ordemServicoEvolucoes.length;
    },
    isUsuarioLogadoEhResponsavel() {
      try {
        return this.ordemServico.responsavel.id == this.user.usuario.id;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async statusIniciar() {
      this.isProcessando = true;
      await this.ActionAddEvolucao({
        status: Status.ANDAMENTO,
        descricao: "Iniciada"
      })
        .then(() => {
          // avisa o parent para altera o estado
          this.$emit("alteracaoStatus", this.ordemServicoEvolucao.status);

          this.$toast.open({
            position: "top",
            message: "Ordem de serviço iniciada com sucesso!",
            type: "success"
          });

          this.getEvolucoes(this.ordemServico.id);
        })
        .catch(err => {
          console.log(err);
          this.erros.push("Erro ao salvar a ordem de serviço");
        })
        .finally(() => {
          this.isProcessando = false;
        });
    },
    getEvolucoes(ordemServicoId) {
      this.isProcessando = true;

      this.ActionListAllEvolucoes(ordemServicoId)
        .catch(err => {
          console.log(err);
          this.erros.push("Erro ao carregar evoluções");
        })
        .finally(() => {
          this.isProcessando = false;
        });
    },
    getData(data) {
      return data == null ? "" : new Date(data).toLocaleString();
    },
    abrirModalEvolucao() {
      if (
        this.$router.currentRoute.name != "ordem-servico-detalhe-evolucao-add"
      ) {
        this.$router.push({
          name: "ordem-servico-detalhe-evolucao-add",
          params: { id: this.ordemServico.id }
        });
      }

      $("#modalEvolucao").modal();
    },
    atualizarStatus(evolucao) {
      this.ActionAddEvolucaoDirect(evolucao);
      if (evolucao.status != null) {
        this.$emit("alteracaoStatus", evolucao.status);
      }
    }
  },
  watch: {
    "ordemServico.id": function(nVal, oVal) {
      this.getEvolucoes(nVal);
    }
  }
};
</script>