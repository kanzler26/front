<!-- анимации для элементов не добавлял -->

<template>
  <v-card-text class="pa-0">
    <!--Модальное окно добавления-->
    <wrappers-modal-overlay
      v-model="modals.adding"
      mode="right"
      translate="dialog-right-transition"
    >
      <template #default="props">
        <modals-users-create-listeners
          v-bind="props"
          @submit="listener => listeners = [listener, ...listeners]"
        />
      </template>
    </wrappers-modal-overlay>
    <!--Модальное окно добавления-->

    <!-- Таблица  -->
    <ui-table
      :selected="selected"
      no-data-text="Слушатели не добавлены"
      no-results-text="Не найдено слушателей"
      loading-text="Загрузка слушателей"
      checkbox-color="primary"
      :headers="headers"
      :items="listeners"
      :loading="loading"
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
        <NuxtLink
          class="primary--text font-weight-medium cursor-pointer"
          :to="`users/listeners/${item.id}`"
        >
          {{item.name}}
        </NuxtLink>
      </template>

      <template #item.groups="{}">
        <v-chip small color="error">Список всех групп</v-chip>
      </template>

      <template #item.counterparties="{}">
        <v-chip small color="error">Контрагент</v-chip>
      </template>
    </ui-table>
  </v-card-text>
</template>

<script lang="ts">
import Vue from "vue";

// Типы
import {IGenericResponseData, IListener} from "~/types/default.types";
import {ITableSelected} from "~/components/not-approved/ui/table.vue";

export interface ITableHeaderItem {
  text: string,
  value: string
}


export default Vue.extend({
  name: "users-tables-listeners",
  data: () => ({
    listeners: [] as Array<IListener>,
    selectedListener: {} as IListener,
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
    headers: [
      { text: 'ФИО', value: 'name' },
      { text: 'Группа', value: 'groups' },
      { text: 'Контрагент', value: 'counterparties' }
    ] as Array<ITableHeaderItem>,

    tab: {},
    currentPage: "",
    search: "",
    loading: true,
    modals: {
      adding: false,
      filters: false,
    },
  }),

  async mounted() {
    // @ts-ignore
    const listeners: IGenericResponseData<Array<IListener>> | any = await this.$api.users.read({ role: 'student', page: 1 });

    if(listeners.data) {
      this.listeners = listeners.data;
    }

    this.loading = false;
  },

  methods: {
    action () {
      console.log('action drop menu item')
    },
  }
})
</script>
