<template>
  <wrappers-modal-content hide-footer>
    <template #header>
      <v-btn
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Форма обратной связи</v-toolbar-title>
    </template>

    <template #body>
      <forms-users-not-approve>
        <template #actions>
          <v-col cols="auto">
            <v-btn
              text
              color="error"
              @click="close"
            >
              Закрыть
            </v-btn>
          </v-col>
        </template>
      </forms-users-not-approve>
    </template>
  </wrappers-modal-content>
</template>

<script lang="ts">
import Vue from "vue";
import { modalMixin } from "~/mixins";

export default Vue.extend({
  name: 'modals-not-approve',
  mixins: [modalMixin],
})
</script>
