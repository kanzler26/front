<template>
  <div>
    <!-- Модальное окно добавление  -->
    <wrappers-modal-overlay
      v-model="modals.adding"
      mode="right"
      transition="dialog-bottom-transition"
    >
      <template #default="props">
        <modals-counterparties-create-legal
          v-bind="props"
        />
      </template>
    </wrappers-modal-overlay>
    <!-- Модальное окно добавление -->

    <ui-table
      :headers="headers"
      :items="counterparties"
      :selected="selected"
      loading-text="Загрузка контрагентов..."
      item-key="id"
      no-data-text="Контрагенты не найдены"
      no-results-text="Контрагенты не найдены"
    >

      <template #actions>
        <v-btn
          color="green"
          icon
          @click="modals.adding = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <template #item.name="{ item }">
        <span class="primary--text font-weight-medium cursor-pointer"> {{ item.name }} </span>
      </template>
      <template #item.position="{}">
        <v-chip small color="error">Должность</v-chip>
      </template>
      <template #item.groups_contractors="{}">
        <div class="d-flex align-center full-cell">
          <div class="d-flex justify-end half-cell pr-3"><v-chip small color="error">Количество групп</v-chip></div>
          <span>/</span>
          <div class="d-flex justify-start half-cell pl-3"><v-chip small color="error">Количество контрагентов</v-chip></div>
        </div>
      </template>
    </ui-table>

  </div>
</template>

<script lang="ts">
import Vue from "vue";

import {
  ITableSelected
} from "~/components/not-approved/ui/table.vue";

import {
  CounterpartiesApiPayload
} from "~/plugins/api/counterparties/counterparties.type";

export default Vue.extend({
  name: "counterparties-table-legal",
  data: () => ({
    selected: {
      value: [],
      dropMenu: {
        display: false,
        elements: [
          {
            icon: {
              icon: "mdi-list-status",
            },
            text: "Отправить доступы",
            action: () => console.log("test")
          },
          {
            icon: {
              icon: "mdi-list-status"
            },
            text: "В группу",
            action: () => console.log("test")
          },
          {
            icon: {
              icon: "mdi-trash-can-outline"
            },
            text: `Удалить выбранные`,
            action: () => console.log("test")
          }
        ]
      }
    } as ITableSelected,
    search: "",
    headers: [
      { text: 'Наименование', value: 'name', cellClass: 'primary--text font-weight-medium cursor-pointer' },
      { text: 'ИНН', value: 'inn', cellClass: 'font-weight-medium' },
      { text: 'Менеджер', value: 'manager' },
      { text: 'Группы', value: 'groups' },
      { text: 'Слушатели', value: 'students' },
      { text: 'Сделки', value: 'deals' }
    ],
    counterparties: [] as Array<CounterpartiesApiPayload>,
    total: 0,
    page: 1,
    itemsPerPage: 20,
    filters: {},

    modals: {
      settings: false,
      filters: false,
      adding: false,
    }
  })
})
</script>
