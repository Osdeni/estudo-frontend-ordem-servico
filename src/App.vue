<template>
  <div id="app">
    <menu-principal />

    <router-view />
  </div>
</template>

<script>

import MenuPrincipal from "@/components/MenuPrincipal";

export default {
  name: "app",
  components: {
    MenuPrincipal
  }
};
</script>

<style>
.hasError input,
.hasError select,
.hasError textarea {
  border: 1px solid red;
}
.hasError label {
  color: red;
}

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
  z-index: 1000;
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