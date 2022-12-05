<template>
  <v-container>
    <portal to="app-main-toolbar">
      <ui-toolbar title="Настройки групп" back-to="/groups" divider/>
    </portal>

    <v-expansion-panels :panels="panels">
      <v-expansion-panel>
        <v-expansion-panel-header class="font-weight-600">Обязательные поля для добавления групп</v-expansion-panel-header>
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
  name: "groups-settings-page",
  layout: "admin",
  data: () => ({
    panels: [0],
  })
})
</script>
