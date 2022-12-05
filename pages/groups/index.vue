<template>
  <v-card flat title>

    <v-toolbar height="64" elevation="0">
      <template v-if="!selected.length">
        <!--  Поиск по таблице  -->
        <v-toolbar-title>
          <h4>Группы ({{groups.length}})</h4>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <ui-form-search
          v-model="search"
          class="pr-4"
        />
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
      >
        <NuxtLink to="/settings/groups">
          <v-icon>mdi-cog</v-icon>
        </NuxtLink>
      </v-btn>
      <!-- Открытие модального окна с добавлением слушателя -->

    </v-toolbar>

    <v-divider></v-divider>
    <!-- Модальное окно добавление  -->
    <wrappers-modal-overlay
      v-model="modals.adding"
      mode="right"
      transition="dialog-bottom-transition"
    >
      <template #default="props">
        <modals-groups-create
          v-bind="props"
        />
      </template>
    </wrappers-modal-overlay>
    <!-- Модальное окно добавление -->
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="groups"
      :single-select="singleSelected"
      :item-selected="selected"
      :loading="!groups.length"
      loading-text="Загрузка групп..."
      checkbox-color="primary"
      item-key="id"
      no-data-text="Группы не добавлены"
      no-results-text="Группы не найдены"
      show-select
    >

    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import {GroupsApiPayload} from "~/plugins/api/groups/groups.type";
import {IDropMenuInit} from "~/components/not-approved/ui/drop-menu.vue";

export default Vue.extend({
  name: "groups-index-page",
  layout: "admin",
  data: () => ({
    search: "",
    groups: [] as Array<GroupsApiPayload>,
    filters: {},
    selected: [],
    singleSelected: false,
    modals: {
      adding: false,
      filters: false,
      settings: false,
      select: {
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
      } as IDropMenuInit,
    },
    headers: [
      { text: 'Название',     sortable: false, value: 'name',  cellClass: 'primary--text font-weight-medium cursor-pointer' },
      { text: 'Направление',  sortable: false, value: 'parent' },
      { text: 'Форма',        sortable: false, value: 'type',  cellClass: 'font-weight-medium' },
      { text: 'Начало/Конец', sortable: false, value: 'date',  cellClass: 'grey--text text--darken-2 font-weight-bold' },
      { text: 'Слушатели',    sortable: false, value: 'listeners', cellClass: 'font-weight-medium grey--text text--darken-2' },
      { text: 'Действия',     sortable: false, value: 'actions',    align: 'center', width: 100 }
    ],
  }),
})
</script>
