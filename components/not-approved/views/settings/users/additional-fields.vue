<template>
  <wrappers-modal-content
    scrollable
    persistent
  >

    <template #header>
      <v-toolbar-title>
        Разряды (категории)
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <template #body>
      <ui-table
        :headers="headers"
        :items="items"
        :selected="selected"
        :search="search"
        :single-line="true"
        :hide-details="true"
        item-key="name"
      >

      </ui-table>
    </template>

    <template #footer>
      <v-btn color="error" text @click="close">Закрыть</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
      >Добавить</v-btn>
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
          "id": 29,
          "name": "Дополнительная дата 1",
          "type": "date"
        },
        {
          "id": 31,
          "name": "Дополнительная дата 2",
          "type": "date"
        },
        {
          "id": 30,
          "name": "Дополнительная строка 1",
          "type": "string"
        },
        {
          "id": 32,
          "name": "Дополнительная строка 2",
          "type": "string"
        }
    ],
    headers: [
      { text: 'ФИО', value: 'name' },
    ],
    search: "",
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
  }),
})
</script>
