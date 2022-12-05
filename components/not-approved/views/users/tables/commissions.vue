<template>
  <div>
    <!--Модальное окно добавления-->
    <wrappers-modal-overlay
      v-model="modals.adding"
      mode="right"
      translate="dialog-right-transition"
    >
      <template #default="props">
        <modals-users-create-commissions
          v-bind="props"
        />
      </template>
    </wrappers-modal-overlay>
    <!--Модальное окно добавления-->

    <ui-table
      :headers="headers"
      :items="commission_members"
      :selected="selected"
      :loading="!commission_members.length"
      loading-text="Загрузка членов комисси..."
      checkbox-color="primary"
      item-key="id"
      no-data-text="Члены коммисии не найдены"
      no-results-text="Члены коммисии не найдены"
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
import {ITableSelected} from "~/components/not-approved/ui/table.vue";

export default Vue.extend({
  name: "users-tables-commissions",
  data: () => ({
    search: "",
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
    modals: {
      filters: false,
      adding: false,
    },
    commission_members: [],
    isLoading: true,
    filters: {},
    headers: [
      { text: 'ФИО', value: 'name' },
      { text: 'Должность', value: 'position' },
      { text: 'Группы / Организации', value: 'groups_contractors', align: 'center' }
    ],
  })
})
</script>
