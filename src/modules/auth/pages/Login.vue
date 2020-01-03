<template>
  <div>
    <form @submit.prevent="submit()" novalidate="true">
      <div class="login-page">
        <div class="card">
          <div class="card-header">Ordem de Serviço: Login</div>
          <div class="card-body">
            <erros :erros="erros" />

            <div class="form-group" :class="{ 'hasError': $v.form.email.$error }">
              <label for="email">E-mail</label>
              <input type="email" v-model="form.email" name="email" class="form-control" required />
            </div>
            <div class="form-group" :class="{ 'hasError': $v.form.senha.$error }">
              <label for="password">Senha</label>
              <input
                type="password"
                v-model="form.senha"
                name="senha"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <button
                class="btn btn-block btn-primary"
                :class="{ disabled: isProcessando }"
                :disabled="isProcessando"
              >{{ getTitulo() }}</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import Erros from "@/components/Erros";

export default {
  validations: {
    form: {
      email: { required, email },
      senha: { required }
    }
  },
  components: {
    Erros
  },
  data: () => ({
    form: {
      email: "",
      senha: ""
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

      this.$v.form.$touch();
      if (this.$v.$invalid) {
        this.erros.push("Favor verificar os campos obrigatórios");
      } else {
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
            console.log(err);
          })
          .finally(() => {
            this.isProcessando = false;
          });
      }
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

@media (min-width: 576px) {
  .login-page .card {
    width: 50%;
  }
}

@media (min-width: 768px) {
  .login-page .card {
    width: 40%;
  }
}

@media (min-width: 992px) {
  .login-page .card {
    width: 30%;
  }
}

@media (min-width: 1200px) {
  .login-page .card {
    width: 20%;
  }
}
</style>
