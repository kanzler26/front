<template>
  <wrappers-modal-content
    scrollable
    persistent
  >

    <template #header>
      <v-toolbar-title>
        Типы документов об образовании
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <template #body>
      <ui-table
        :headers="headers"
        :search="search"
        :selected="selected"
        :items="items"
        :single-line="true"
        :hide-details="true"
        item-key="name"
        modal
      >
      </ui-table>
    </template>

    <template #footer>
      <v-btn color="error" text @click="close">Закрыть</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" text>Добавить</v-btn>
    </template>

  </wrappers-modal-content>
</template>

<script>
import Vue from "vue";
import { modalMixin } from "~/mixins";

export default Vue.extend({
  name: "settings-users-data-list-type-education",
  mixins: [modalMixin],
  data: () => ({
    items: [
      {
        "id": 17,
        "name": "Документ о высшем образовании 1"
      },
      {
        "id": 20,
        "name": "Документ о высшем образовании 2"
      },
      {
        "id": 18,
        "name": "Документ о среднем образовании 1"
      },
      {
        "id": 19,
        "name": "Документ о среднем образовании 2"
      }
    ],
    headers: [
      { text: 'ФИО', value: 'name' },
    ],
    selected: {
      value: [],
      dropMenu: {
        display: false,
        elements: [
          {
            icon: "mdi-list-status",
            text: "Отправить доступы",
            action: () => console.log("test")
          },
          {
            icon: "mdi-list-status",
            text: "В группу",
            action: () => console.log("test")
          },
          {
            icon: "mdi-trash-can-outline",
            text: `Удалить выбранные`,
            action: () => console.log("test")
          }
        ]
      },
    },
    search: "",
  }),
})
</script>
