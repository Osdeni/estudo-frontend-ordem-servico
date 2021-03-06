<template>
  <div class="ordemServico container-fluid">
    <h1>Ordens de Serviço</h1>

    <div class="submenu-bar">
      <router-link :to="{name: 'ordem-servico'}" class="btn btn-primary col-sm-12 col-md-2">Voltar</router-link>
    </div>

    <form @submit.prevent="submit()" novalidate="true">
      <div class>
        <div class="card">
          <div class="card-header">Cadastrar ordem de serviço</div>
          <div class="card-body">
            <erros :erros="erros" />

            <div class="form-group" :class="{ 'hasError': $v.form.dataAbertura.$error }">
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

            <div class="form-group" :class="{ 'hasError': $v.form.cliente.$error }">
              <label for="cliente">
                Cliente
                <small>(Informe ao menos 2 caracteres)</small>
              </label>

              <div class="grupo-autocomplete">
                <button
                  type="button"
                  class="btn btn-secondary col-md-2"
                  title="Cadastrar novo cliente"
                  @click="abrirModalCliente()"
                >+ Novo cliente</button>
                <v-autocomplete
                  class="col-md-10 pl-0 pr-0"
                  input-class="form-control"
                  :items="clientes"
                  :value="form.cliente"
                  v-model="form.cliente"
                  :get-label="getLabel"
                  :component-item="template"
                  @update-items="updateItems"
                ></v-autocomplete>
              </div>
            </div>

            <div class="form-group" :class="{ 'hasError': $v.form.defeito.$error }">
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
              <div class="form-group col-md-6" :class="{ 'hasError': $v.form.tipo.$error }">
                <label for="tipo">Tipo</label>
                <select type="text" v-model="form.tipo" name="tipo" class="form-control" required>
                  <option disabled value>Selecione um item</option>
                  <option :value="tipo.id" v-for="tipo in tipos">{{ tipo.descricao }}</option>
                </select>
              </div>

              <div class="form-group col-md-6" :class="{ 'hasError': $v.form.marca.$error }">
                <label for="marca">Marca</label>
                <select type="text" v-model="form.marca" name="marca" class="form-control" required>
                  <option disabled value>Selecione um item</option>
                  <option :value="marca.id" v-for="marca in marcas">{{ marca.descricao }}</option>
                </select>
              </div>
            </div>

            <div class="form-group" :class="{ 'hasError': $v.form.responsavel.$error }">
              <label for="cliente">Responsável</label>

              <select class="form-control" v-model="form.responsavel" name="responsavel">
                <option disabled selected value>Selecione uma opção</option>
                <option v-for="resp in responsaveis" :value="resp.id">{{ resp.nome }}</option>
              </select>
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
import ItemTemplate from "./ItemAutocompleteCliente.vue";
import { required, email } from "vuelidate/lib/validators";
import Erros from "@/components/Erros";

export default {
  name: "OrdemServicoAdd",
  validations: {
    form: {
      dataAbertura: { required },
      cliente: { required },
      responsavel: { required },
      defeito: { required },
      tipo: { required },
      marca: { required }
    }
  },
  components: {
    Erros
  },
  data() {
    return {
      isProcessando: false,
      erros: [],
      template: ItemTemplate,
      // form: this.initDataMock()
      form: this.initData()
    };
  },
  directives: { mask },
  created() {
    // intercepta o cadastro do cliente e atualiza no form de ordem de serviço
    EventBus.$off("clienteCadastrado");
    EventBus.$on("clienteCadastrado", cliente => {
      this.form.cliente = cliente;
    });
  },
  async mounted() {
    await this.getTipos();
    await this.getMarcas();
    await this.getListResponsaveis();
  },
  computed: {
    ...mapState("tipo", ["tipos"]),
    ...mapState("marca", ["marcas"]),
    ...mapState("cliente", ["clientes", "responsaveis"])
  },
  methods: {
    ...mapActions("ordemServico", ["ActionAddOrdemServicos"]),
    ...mapActions("tipo", ["ActionFindAllTipos"]),
    ...mapActions("marca", ["ActionFindAllMarcas"]),
    ...mapActions("cliente", [
      "ActionFindClienteAutocomplete",
      "ActionFindResponsaveis"
    ]),
    initData() {
      return {
        dataAbertura: "",
        cliente: null,
        responsavel: null,
        defeito: "",
        tipo: "",
        marca: ""
      };
    },
    initDataMock() {
      // dados para testes com form preenchido
      return {
        dataAbertura: "23/06/1986",
        cliente: { id: 2, nome: "osdeni hotmail", email: "osdeni@hotmail.com" },
        responsavel: { id: 1, nome: "osdeni", email: "osdeni@gmail.com" },
        defeito: "A TV está com problemas",
        tipo: 1,
        marca: 1
      };
    },
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
    },
    async updateItems(query) {
      // método do autocomplete
      await this.ActionFindClienteAutocomplete(query);
    },
    getLabel(item) {
      // método do autocomplete
      try {
        return item.nome;
      } catch (e) {
        return null;
      }
    },
    async getListResponsaveis() {
      await this.ActionFindResponsaveis().catch(err => {
        this.erros.push("Erro ao recuperar os responsáveis");
      });
    },
    async submit() {
      this.erros.length = 0;

      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.erros.push("Favor verificar os campos obrigatórios");
      } else {
        this.isProcessando = true;
        await this.ActionAddOrdemServicos(this.form)
          .then(res => {
            this.$toast.open({
              position: "top",
              message: "Ordem de serviço criada com sucesso!",
              type: "success"
            });
            this.$router.push({ name: "ordem-servico" });
          })
          .catch(err => {
            this.erros.push("Erro ao salvar a ordem de serviço");
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