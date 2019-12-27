<template>
  <div>
    <form @submit.prevent="submit()">
      <div class="login-page">
        <div class="card">
          <div class="card-header">
            Login
          </div>
          <div class="card-body">
            <!-- TODO componentizar -->
            <ul class="alert alert-danger" v-show="erros.length > 0">
              <li v-for="erro in erros">
                {{ erro }}
              </li>
            </ul>

            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                type="email"
                v-model="form.email"
                name="email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                v-model="form.senha"
                name="senha"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <button
                class="btn btn-block btn-primary"
                :class="{ disabled: isProcessando }"
                :disabled="isProcessando"
              >
                {{ getTitulo() }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    form: {
      email: "osdeni@gmail.com",
      senha: "secret"
    },
    erros: [],
    isProcessando: false
  }),
  methods: {
    ...mapActions("auth", ["ActionDoLogin"]),
    getTitulo() {
      return !this.isProcessando ? "Entrar" : "Processando...";
    },
    async submit() {
      this.erros.length = 0;
      this.isProcessando = true;

      await this.ActionDoLogin(this.form)
        .then(res => {
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          if (err.data) {
            this.erros.push(err.data.erro);
          } else if (Number(err.status) === 0) {
            this.erros.push("Erro na autenticação, API não está respondendo");
          } else {
            this.erros.push("Erro na autenticação, retorno inesperado");
          }
        })
        .finally(() => {
          this.isProcessando = false;
        });
    }
  }
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/** TODO % com media query? */
.login-page .card {
  width: 30%;
}

</style>
