<template>
  <v-list dense flat>
    <v-list-item
      v-for="tab in tabs"
      :key="tab.label"
      link
      @click="actionIsExist(tab)"
    >
      <v-list-item-icon link>
        <v-icon>{{tab.icon}}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="font-weight-medium" v-text="tab.label">
        </v-list-item-title>
      </v-list-item-content>

      <template v-if="tab.modal">
        <wrappers-modal-overlay
          v-model="tab.modal.display"
          mode="right"
          transition="dialog-bottom-transition"
        >
          <template #default="props">
            <component :is="tab.modal.component" v-bind="props"></component>
          </template>
        </wrappers-modal-overlay>
      </template>
    </v-list-item>

  </v-list>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "settings-users-data-list",
  data: () => ({
    tabs: [
      {
        icon: 'mdi-account-hard-hat',
        label: 'Должности',
        type: 'positions',
        modal: {
          display: false,
          component: 'settings-users-positions'
        },
        action () {
          this.modal.display = true
        }
      },
      {
        icon: 'mdi-numeric-2-box-multiple-outline',
        label: 'Разряды (категории)',
        type: 'positionRanks',
        modal: {
          display: false,
          component: 'settings-users-positions-rank'
        },
        action () {
          this.modal.display = true
        }
      },
      {
        icon: 'mdi-school',
        label: 'Типы образований',
        type: 'educationNames',
        modal: {
          display: false,
          component: 'settings-users-type-education'
        },
        action () {
          this.modal.display = true
        }
      },
      {
        icon: 'mdi-certificate',
        label: 'Типы документов об образовании',
        type: 'educationDocNames',
        modal: {
          display: false,
          component: 'settings-users-type-doc-education'
        },
        action () {
          this.modal.display = true
        }
      },
      {
        icon: 'mdi-attachment',
        label: 'Пакет документов от слушателя',
        type: false
      },
      {
        icon: 'mdi-playlist-edit',
        label: 'Дополнительные поля слушателей',
        type: 'studentFields',
        modal: {
          display: false,
          component: 'settings-users-additional-fields'
        },
        action () {
          this.modal.display = true
        },
      }
    ],
  }),
  methods: {
    actionIsExist (tab) {
      if(!tab.action) {
        return false
      }
      tab.action();
    }
  }
})
</script>
