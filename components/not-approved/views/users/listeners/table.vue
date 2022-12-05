<template>
  <v-card-text class="pa-0">
  <!--Модальное окно добавления-->
    <wrappers-modal-overlay
      v-model="modals.adding"
      mode="right"
      translate="dialog-right-transition"
    >
      <template #default="props">
        <modals-users-listeners-create
          v-bind="props"
        />
      </template>
    </wrappers-modal-overlay>
  <!--Модальное окно добавления-->

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

    <!-- Модальное окно настроек  -->
    <wrappers-modal-overlay
      v-model="modals.settings"
      mode="right"
      transition="dialog-bottom-transition"
    >
      <template #default="props">
        <modals-users-settings
          v-bind="props"
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

    <!-- Таблица  -->
    <v-data-table
      v-model="selected"
      show-select
      no-data-text="Слушатели не добавлены"
      no-results-text="Не найдено слушателей"
      loading-text="Загрузка слушателей"
      item-key="name"
      checkbox-color="primary"
      :headers="headers"
      :items="listeners"
      :loading="!listeners.length"
    >
      <!-- Рендер кастомного компонента для каждой строки в таблице  -->
      <template #item.name="{ item }">
        <NuxtLink
          class="primary--text font-weight-medium cursor-pointer"
          :to="`users/listeners/${item.id}`"
        >
          {{item.name}}
        </NuxtLink>
      </template>

      <template #item.groups>
        <v-chip small color="error">Список всех групп</v-chip>
      </template>

      <template #item.counterparties>
        <v-chip small color="error">Контрагент</v-chip>
      </template>
      <!-- Рендер кастомного компонента для каждой строки в таблице  -->
    </v-data-table>
    <!-- Таблица  -->
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";

// Типы
import { StudentsApiPayload } from "~/plugins/api/users/users.type"
import {IFilter} from "~/components/modals/users/filter.vue";
import {IDropMenuInit} from "~/components/not-approved/ui/drop-menu.vue";

interface ITableHeaderItem {
  text: string,
  value: string
}


export default Vue.extend({
  name: "listeners-table",
  data: () => ({
    listeners: [] as Array<StudentsApiPayload>,
    selectedListener: {} as StudentsApiPayload,
    selected: [] as Array<StudentsApiPayload>,
    headers: [
      { text: 'ФИО', value: 'name' },
      { text: 'Группа', value: 'groups' },
      { text: 'Контрагент', value: 'counterparties' }
    ] as Array<ITableHeaderItem>,

    tab: {},
    currentPage: "",
    search: "",
    modals: {
      adding: false,
      filters: false,
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
      settings: false,
    },
    filters: {
      test: "",
    } as IFilter
  }),

  async mounted() {
    // @ts-ignore
    /*
    const listeners: IGenericResponseData<Array<IListener>> | any = await this.$api.users.read({ role: 'student', page: 1 });

    if(listeners.data) {
      this.listeners = listeners.data;
    }
    */
  },

  methods: {
    action () {
      console.log('action drop menu item')
    }
  }
})
</script>
