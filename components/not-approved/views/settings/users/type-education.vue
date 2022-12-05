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
        :search="search"
        :selected="selected"
        :single-line="true"
        :hide-details="true"
        item-key="name"
      ></ui-table>
    </template>

    <template #footer>
      <v-btn color="error" text @click="close">Закрыть</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!selected.length"
        color="primary"
        text
      >Добавить</v-btn>
      <v-btn
        v-else
        color="primary"
        text
      >Удалить ({{selected.length}})</v-btn>
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
        "id": 8,
        "name": "Высшее образование 1"
      },
      {
        "id": 12,
        "name": "Высшее образование 2"
      },
      {
        "id": 9,
        "name": "Среднее образование 1"
      },
      {
        "id": 11,
        "name": "Среднее образование 2"
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
            action: () => this.test()
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
  methods: {
    test () {

    }
  }
})
</script>
