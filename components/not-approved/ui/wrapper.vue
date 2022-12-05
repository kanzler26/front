<template>
  <v-col
    :style="{'max-width': maxWidth}"
  >
    <slot></slot>
  </v-col>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "wrapper-page",
  props: {
    maxWidth: {
      type: String,
      default: '',
    }
  }
})
</script>
