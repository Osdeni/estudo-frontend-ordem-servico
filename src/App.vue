<template>
  <div id="app">
    <!-- TODO componentizar menu -->
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
              <a href="" class="dropdown-item" @click.prevent="logout()">Sair</a>
            </div>
          </li>
        </ul>
        <div class="text-light"></div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
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

<style>
.grupo-autocomplete {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}

.submenu-bar {
  margin-bottom: 10px;
}

/** start autocomplete */
.v-autocomplete .v-autocomplete-list {
  width: 100%;
  text-align: left;
  border: none;
  border-top: none;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #157977;
}
.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item {
  cursor: pointer;
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #157977;
  border-left: 1px solid #157977;
  border-right: 1px solid #157977;
}
.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item:last-child {
  border-bottom: none;
}
.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item:hover {
  background-color: #eee;
}
.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item abbr {
  opacity: 0.8;
  font-size: 0.8em;
  display: block;
  font-family: sans-serif;
}
.v-autocomplete {
  position: relative;
}
.v-autocomplete .v-autocomplete-list {
  position: absolute;
}
.v-autocomplete .v-autocomplete-list .v-autocomplete-list-item {
  cursor: pointer;
}
.v-autocomplete
  .v-autocomplete-list
  .v-autocomplete-list-item.v-autocomplete-item-active {
  background-color: #f3f6fa;
}
/** end  autocomplete */
</style>