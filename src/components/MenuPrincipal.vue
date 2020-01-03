<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="isUsuarioAutenticado()">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active text-light">Ordens de serviços</li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{ user.usuario.nome }}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a href class="dropdown-item" @click.prevent="logout()">Sair</a>
            </div>
          </li>
        </ul>
        <div class="text-light"></div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "MenuPrincipal",
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    ...mapActions("auth", ["ActionSignOut"]),
    isUsuarioAutenticado() {
      return Object.entries(this.user).length === 0 ? false : true;
    },
    logout() {
      this.ActionSignOut();
      this.$router.push({ name: "login" });
    }
  }
};
</script>