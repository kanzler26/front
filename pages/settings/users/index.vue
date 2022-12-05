<template>
  <v-container>
    <portal to="app-main-toolbar">
      <ui-toolbar title="Настройки пользователей" back-to="/users" divider/>
    </portal>

    <v-expansion-panels :panels="panels" accordion multiple>
      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-600">Списки данных</v-expansion-panel-header>
        <v-expansion-panel-content>
          <views-settings-users/>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-600">Обязательные поля для добавления слушателей</v-expansion-panel-header>
        <v-expansion-panel-content>
          <forms-important-fields/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "settings-users",
  layout: "admin",
  data: () => ({
    panels: [0],
  })
})
</script>
