<template>
  <div>
    <span class="badge" :class="getClass()">{{ getLabel() }}</span>
  </div>
</template>

<script>
export default {
  name: "StatusBadge",
  data() {
    return {
      default: "-"
    };
  },
  mounted() {
  },
  props: {
      status: {
          required: true
      }
  },
  methods: {
    getClass() {
      try {
        return this.status.cssClass;
      } catch (e) {
        return "";
      }
    },
    getLabel() {
      try {
        return this.status.label;
      } catch (e) {
        return "-";
      }
    }
  }
};
</script>