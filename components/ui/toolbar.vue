<template>
  <div>
    <v-toolbar elevation="0">

      <v-app-bar-nav-icon v-if="backTo" :to="backTo" exact>
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title v-if="title" class="font-weight-600">
        {{ title }}
      </v-toolbar-title>

      <slot></slot>

    </v-toolbar>

    <v-divider v-if="divider" />

  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "ui-toolbar",
  props: {
    backTo: {
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => ''
    },
    divider: {
      type: Boolean,
      default: () => false
    },
  }
})
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
}

.tabs-wrapper {
  background: #f3f3f3;
}

</style>
