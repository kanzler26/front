<template>
  <wrappers-modal-content hide-footer>
    <template #header>
      <v-toolbar-title>
        Вопрос
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <template #body>
      <views-question ref="question" v-bind="$attrs" />
    </template>
  </wrappers-modal-content>
</template>

<script lang="ts">

import Vue from "vue"

import {
  modalMixin
} from "~/mixins"

export default Vue.extend({
  name: "modals-question-edit",
  mixins: [
    modalMixin
  ],
})

</script>
