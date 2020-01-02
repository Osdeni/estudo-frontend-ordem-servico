<template>
  <div>
    <b>#{{item.id}}</b>
    <span>{{ item.nome }}</span>
    <abbr>{{ item.email }}</abbr>
  </div>
</template>
 
<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
};
</script> 