<template>
  <div class="ordemServico container-fluid">
    <h1>Ordens de Serviço</h1>

    <div class="submenu-bar">
      <router-link :to="{name: 'ordem-servico'}" class="btn btn-primary col-sm-12 col-md-2">Voltar</router-link>
    </div>

    <form>
      <div class>
        <div class="card">
          <div class="card-header">Cadastrar ordem de serviço</div>
          <div class="card-body">
            <!-- TODO componentizar -->
            <ul class="alert alert-danger" v-show="erros.length > 0">
              <li v-for="erro in erros">{{ erro }}</li>
            </ul>

            <ul>
              <li>Cliente podendo add direto com autocomplete</li>
              <li>Responsável</li>
            </ul>

            <div class="form-group">
              <label for="dataAbertura">Data</label>
              <input
                type="string"
                v-model="form.dataAbertura"
                name="dataAbertura"
                class="form-control"
                placeholder="dd/mm/YYYY"
                v-mask="'##/##/####'"
                required
              />
            </div>

            <div class="form-group">
              <label for="defeito">Cliente</label>

              <div class="input-group">
                <vue-bootstrap-typeahead
                  v-model="query"
                  :data="['Canada', 'USA', 'Mexico']"
                  placeholder="Informe o nome do cliente"
                />
                <div class="input-group-append">
                  <a
                    type="button"
                    class="btn btn-primary"
                    id="btnGroupAddon2"
                    title="Cadastrar novo cliente"
                    @click="abrirModalCliente()"
                  >+</a>
                </div>
              </div>
              {{ query }}
            </div>

            <div class="form-group">
              <label for="cliente">Cliente</label>
              <input
                type="text"
                v-model="form.cliente"
                name="cliente"
                class="form-control"
                required
              />
            </div>

            <div class="form-group">
              <label for="defeito">Defeito</label>
              <textarea
                type="text"
                v-model="form.defeito"
                name="defeito"
                class="form-control"
                required
              ></textarea>
            </div>

            <div class="row">
              <div class="form-group col-md-6">
                <label for="tipo">Tipo</label>
                <select type="text" v-model="form.tipo" name="tipo" class="form-control" required>
                  <option disabled value>Selecione um item</option>
                  <option :value="tipo.id" v-for="tipo in tipos">{{ tipo.descricao }}</option>
                </select>
              </div>

              <div class="form-group col-md-6">
                <label for="marca">Marca</label>
                <select type="text" v-model="form.marca" name="marca" class="form-control" required>
                  <option disabled value>Selecione um item</option>
                  <option :value="marca.id" v-for="marca in marcas">{{ marca.descricao }}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <button
                class="btn btn-primary float-right"
                :class="{ disabled: isProcessando }"
                :disabled="isProcessando"
              >{{ getTitulo() }}</button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- TODO componentizar -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalClientes"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalClientes"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/main";
import { mapActions, mapState } from "vuex";
import { mask } from "vue-the-mask";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

//https://github.com/alexurquhart/vue-bootstrap-typeahead

export default {
  name: "OrdemServicoAdd",
  data: function() {
    return {
      isProcessando: false,
      erros: [],
      query: "",
      form: {
        dataAbertura: "",
        cliente: "",
        defeito: "",
        tipo: "",
        marca: ""
      }
    };
  },
  directives: { mask },
  components: { VueBootstrapTypeahead },
  created() {
    console.log("created");
    EventBus.$on("clienteCadastrado", cliente => {
      console.log("evento interceptado");
      console.log(cliente);

      this.form.cliente = cliente.id;
    });
  },
  async mounted() {
    await this.getTipos();
    await this.getMarcas();
  },
  computed: {
    // ...mapState("ordemServico", ["ordensServicos"])
    ...mapState("tipo", ["tipos"]),
    ...mapState("marca", ["marcas"])
  },
  methods: {
    // ...mapActions("ordemServico", ["ActionFindOrdemServicos"])
    ...mapActions("tipo", ["ActionFindAllTipos"]),
    ...mapActions("marca", ["ActionFindAllMarcas"]),
    getTitulo() {
      return this.isProcessando ? "Processando.." : "Salvar";
    },
    getTipos() {
      this.ActionFindAllTipos().catch(err => {
        this.erros.push("Erro ao carregar tipos");
        console.log(err);
      });
    },
    getMarcas() {
      this.ActionFindAllMarcas().catch(err => {
        this.erros.push("Erro ao carregar marcas");
        console.log(err);
      });
    },
    abrirModalCliente() {
      if (this.$router.currentRoute.name != "ordem-servico-add-cliente-add") {
        this.$router.push({ name: "ordem-servico-add-cliente-add" });
      }

      $("#modalClientes").modal();
    }
  }
};
</script>

<style scoped>
.submenu-bar {
  margin-bottom: 10px;
}
</style>