<template>
  <div>
    <!-- Модальное окно добавления  -->
    <wrappers-modal-overlay
      v-model="modals.adding"
      mode="right"
      translate="dialog-right-transition"
    >
      <template #default="props">
        <modals-counterparties-create-individuals
          v-bind="props"
        />
      </template>
    </wrappers-modal-overlay>
    <!-- Модальное окно добавления  -->


    <ui-table
      :headers="headers"
      :selected="selected"
      :search="{
        params: {
          name: '',
        }
      }"
      base-url="employer/counterparties"
      loading-text="Загрузка контрагентов..."
      item-key="id"
      no-data-text="Контрагенты не найдены"
      no-results-text="Контрагенты не найдены"
    >

      <template #actions>
        <v-btn
          color="success"
          icon
          @click="modals.adding = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <template #item.name="{ item }">
        <RouterLink
          class="primary--text font-weight-medium cursor-pointer"
          :to="`counterparties/${item.id}`"
        > {{ item.name }} </RouterLink>
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
import {ICounterpartLegal} from "~/plugins/api/counterparties/counterparties.type";
import {ITableSelected} from "~/components/not-approved/ui/table.vue";

export default Vue.extend({
  name: "counterparties-table-all",
  data: () => ({
    search: "",
    headers: [
      { text: 'Наименование', value: 'name', cellClass: 'primary--text font-weight-medium cursor-pointer table-row-split' },
      { text: 'ИНН', value: 'inn', cellClass: 'font-weight-medium' },
      { text: 'Менеджер', value: 'manager' },
      { text: 'Группы', value: 'groups' },
      { text: 'Слушатели', value: 'students' },
      { text: 'Сделки', value: 'deals' }
    ],
    counterparties: [] as Array<ICounterpartLegal>,
    total: 0,
    page: 1,
    itemsPerPage: 20,
    filters: {},
    modals: {
      settings: false,
      filters: false,
      adding: false,
    },
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
  }),
})
</script>
