<template>
  <div>
    <!-- Модальное окно добавления  -->
    <wrappers-modal-overlay
      v-model="modals.adding"
      mode="right"
      translate="dialog-right-transition"
    >
      <template #default="props">
        <modals-counterparties-create
          v-bind="props"
        />
      </template>
    </wrappers-modal-overlay>
    <!-- Модальное окно добавления  -->

    <!-- Модальное окно фильтров  -->
    <wrappers-modal-overlay
      v-model="modals.filters"
      mode="top"
      transition="dialog-bottom-transition"
      :fullscreen="true"
      :hide-overlay="true"
    >
      <template #default="props">
        <modals-users-filter
          v-bind="props"
          @submit="(updateFilters) => filters = updateFilters"
        />
      </template>
    </wrappers-modal-overlay>
    <!-- Модальное окно фильтров -->

    <v-toolbar height="64" elevation="0">
      <template v-if="!selected.length">
        <!--  Поиск по таблице  -->
        <ui-form-search
          v-model="search"
        />
        <v-spacer></v-spacer>
        <!--  Поиск по таблице  -->
      </template>

      <template v-else>
        <h4>Выбрано: {{selected.length}}</h4>
        <v-spacer></v-spacer>

        <!--    Выпадающий список      -->
        <ui-drop-menu
          v-model="modals.select.display"
          :elements="modals.select.elements"
        />
        <!--    Выпадающий список      -->
      </template>

      <!-- Открытие модального окна с фильтрами -->
      <v-btn
        color="primary"
        icon
        @click="modals.filters = true"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <!-- Открытие модального окна с добавлением слушателя -->

      <!-- Открытие модального окна с добавлением слушателя -->
      <v-btn
        color="green"
        icon
        @click="modals.adding = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <!-- Открытие модального окна с добавлением слушателя -->

      <!-- Открытие модального окна с настройками -->
      <v-btn
        color="gray"
        icon
        @click="modals.settings = true"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <!-- Открытие модального окна с добавлением слушателя -->

    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="counterparties"
      :v-model="selected"
      :loading="!counterparties.length"
      loading-text="Загрузка контрагентов..."
      checkbox-color="primary"
      item-key="id"
      no-data-text="Контрагенты не найдены"
      no-results-text="Контрагенты не найдены"
      show-select
    >

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
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  CounterpartiesApiPayload
} from "~/plugins/api/counterparties/counterparties.type";
import {IDropMenuInit} from "~/components/not-approved/ui/drop-menu.vue";

export default Vue.extend({
  name: "counterparties-table-all",
  data: () => ({
    selected: [],
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
      select: {
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
    }
  })
})
</script>
