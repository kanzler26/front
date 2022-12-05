<template>
  <ui-wrapper max-width="initial">
    <portal to="app-main-toolbar">
      <ui-toolbar title="Контрагенты" divider tabs class="">
        <v-spacer></v-spacer>

        <ui-search icon="account-search"/>

        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn icon to="/settings/counterparties">
          <v-icon>mdi-cog</v-icon>
        </v-btn>


        <template #tabs>
          <ui-switched-tabs
            :tabs="tabs"
            color="black"
            @change="(currentTab) => tab = currentTab"
          ></ui-switched-tabs>
        </template>

      </ui-toolbar>
    </portal>
    <keep-alive>
      <component :is="tab.component"></component>
    </keep-alive>
  </ui-wrapper>
</template>

<script lang="ts">
// Типы
import Vue from "vue";
import {ISwitchedTab} from "~/components/not-approved/ui/switched-tabs.vue";

export default Vue.extend({
  name: "counterparties-index-page",
  layout: 'admin',
  data: () => ({
    users: null,
    tabs: [
      {
        name: "Все",
        component: "views-counterparties-tables-all"
      },
      {
        name: "Физ лица",
        component: "views-counterparties-tables-individuals"
      },
      {
        name: "Юр лица",
        component: "views-counterparties-tables-legal"
      },
    ] as Array<ISwitchedTab>,

    tab: {
      name: "",
      component: ""
    } as ISwitchedTab,
  }),

  head: () => ({
    title: "Контрагенты"
  }),

  mounted() {
    this.tab = this.tabs[0];
  }
})
</script>
