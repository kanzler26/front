<template>
  <wrappers-modal-content>
    <template #header>
      <v-toolbar-title>
        Экзамен
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <template #body>
      {{ value }}
    </template>
  </wrappers-modal-content>
</template>

<script>
import { modalMixin } from "~/mixins"

export default {
  name: "modals-exams-edit",
  mixins: [
    modalMixin
  ],
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
