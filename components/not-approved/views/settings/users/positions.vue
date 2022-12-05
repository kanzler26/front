<template>
  <wrappers-modal-content
    scrollable
    persistent
  >

    <template #header>
      <v-toolbar-title>
        Должности
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
  name: "settings-users-data-list-position",
  mixins: [modalMixin],
  data: () => ({
    items: [
      {
        "id": 496,
        "code": 11007,
        "name": "Аппаратчик талловой установки",
        "type": "worker",
        "check_number": 5,
        "okz": 8142,
        "category": null,
        "etks": "41",
        "range_ranks": "2-5"
      },
      {
        "id": 497,
        "code": 11009,
        "name": "Аппаратчик теплоутилизации",
        "type": "worker",
        "check_number": 4,
        "okz": 8159,
        "category": null,
        "etks": "24",
        "range_ranks": "2-4"
      },
      {
        "id": 498,
        "code": 11011,
        "name": "Аппаратчик термической активации углей",
        "type": "worker",
        "check_number": 1,
        "okz": 8112,
        "category": null,
        "etks": "30",
        "range_ranks": "3-4"
      },
      {
        "id": 499,
        "code": 11013,
        "name": "Аппаратчик термической коагуляции белковых веществ",
        "type": "worker",
        "check_number": 0,
        "okz": 8274,
        "category": null,
        "etks": "55",
        "range_ranks": "4"
      },
      {
        "id": 500,
        "code": 11017,
        "name": "Аппаратчик термической обработки мясопродуктов",
        "type": "worker",
        "check_number": 9,
        "okz": 8271,
        "category": null,
        "etks": "49",
        "range_ranks": ""
      },
      {
        "id": 501,
        "code": 11019,
        "name": "Аппаратчик термической обработки субпродуктов",
        "type": "worker",
        "check_number": 8,
        "okz": 8271,
        "category": null,
        "etks": "52",
        "range_ranks": "4"
      },
      {
        "id": 502,
        "code": 11021,
        "name": "Аппаратчик термовлажностной обработки",
        "type": "worker",
        "check_number": 5,
        "okz": 8234,
        "category": null,
        "etks": "27",
        "range_ranks": "4"
      },
      {
        "id": 503,
        "code": 11023,
        "name": "Аппаратчик термообработки коксуемой шихты",
        "type": "worker",
        "check_number": 4,
        "okz": 8125,
        "category": null,
        "etks": "07",
        "range_ranks": "4-7"
      },
      {
        "id": 504,
        "code": 11025,
        "name": "Аппаратчик термообработки пластмассовых изделий",
        "type": "worker",
        "check_number": 3,
        "okz": 8232,
        "category": null,
        "etks": "27",
        "range_ranks": "2-5"
      },
      {
        "id": 505,
        "code": 11027,
        "name": "Аппаратчик термообработки ткани",
        "type": "worker",
        "check_number": 2,
        "okz": 8269,
        "category": null,
        "etks": "47",
        "range_ranks": "2-3"
      },
      {
        "id": 506,
        "code": 11029,
        "name": "Аппаратчик терморелаксации пряжи",
        "type": "worker",
        "check_number": 1,
        "okz": 8261,
        "category": null,
        "etks": "47",
        "range_ranks": "3"
      },
      {
        "id": 507,
        "code": 11030,
        "name": "Аппаратчик термостабилизации",
        "type": "worker",
        "check_number": 4,
        "okz": 8261,
        "category": null,
        "etks": "47",
        "range_ranks": "3"
      },
      {
        "id": 508,
        "code": 11032,
        "name": "Аппаратчик томатосокового агрегата",
        "type": "worker",
        "check_number": 3,
        "okz": 8275,
        "category": null,
        "etks": "51",
        "range_ranks": ""
      },
      {
        "id": 509,
        "code": 11034,
        "name": "Аппаратчик увлажнения",
        "type": "worker",
        "check_number": 2,
        "okz": 8261,
        "category": null,
        "etks": "47",
        "range_ranks": "2"
      },
      {
        "id": 510,
        "code": 11036,
        "name": "Аппаратчик углеобогащения",
        "type": "worker",
        "check_number": 1,
        "okz": 8112,
        "category": null,
        "etks": "04",
        "range_ranks": "2-5"
      },
      {
        "id": 511,
        "code": 11038,
        "name": "Аппаратчик улавливания жиров",
        "type": "worker",
        "check_number": 0,
        "okz": 8233,
        "category": null,
        "etks": "32",
        "range_ranks": "3"
      },
      {
        "id": 512,
        "code": 11040,
        "name": "Аппаратчик упаривания и сгущения продуктов",
        "type": "worker",
        "check_number": 8,
        "okz": 8278,
        "category": null,
        "etks": "48",
        "range_ranks": ""
      },
      {
        "id": 513,
        "code": 11041,
        "name": "Аппаратчик уплотнения технического углерода",
        "type": "worker",
        "check_number": 2,
        "okz": 8231,
        "category": null,
        "etks": "33",
        "range_ranks": "4"
      },
      {
        "id": 514,
        "code": 11043,
        "name": "Аппаратчик установки для отделения мяса от кости",
        "type": "worker",
        "check_number": 1,
        "okz": 8271,
        "category": null,
        "etks": "52",
        "range_ranks": "5"
      },
      {
        "id": 515,
        "code": 11045,
        "name": "Аппаратчик установки нейтрального газа",
        "type": "worker",
        "check_number": 0,
        "okz": 8121,
        "category": null,
        "etks": "07",
        "range_ranks": "2-5"
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

<style scoped>
  .selected-field {
    min-height: 24px;
  }
</style>
