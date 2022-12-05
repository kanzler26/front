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
  name: "settings-users-data-list-position-rank",
  mixins: [modalMixin],
  data: () => ({
    items: [
        {
          "id": 8,
          "name": "Второй разряд 1"
        },
        {
          "id": 16,
          "name": "Второй разряд 2"
        },
        {
          "id": 7,
          "name": "Первый разряд 1"
        },
        {
          "id": 15,
          "name": "Первый разряд 2"
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
