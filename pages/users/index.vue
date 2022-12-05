<template>
  <ui-wrapper max-width="initial">
    <portal to="app-main-toolbar">
      <ui-toolbar title="Пользователи" divider tabs class="">
        <v-spacer></v-spacer>

        <ui-search icon="account-search"/>

        <v-btn icon>
          <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn icon to="/settings/users">
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

    <component :is="tab.component"></component>
  </ui-wrapper>

</template>

<script lang="ts">
// Типы
import Vue from "vue";
import {ISwitchedTab} from "~/components/not-approved/ui/switched-tabs.vue";
export default Vue.extend({
  name: "users-index-page",
  layout: "admin",
  data: () => ({
    tabs: [
      {
        name: "Слушатели",
        component: "views-users-tables-listeners"
      },
      {
        name: "Сотрудники",
        component: "views-users-tables-employers"
      },
      {
        name: "Члены комиссиии",
        component: "views-users-tables-commissions"
      }
    ] as Array<ISwitchedTab>,

    tab: {
      name: "",
      component: ""
    } as ISwitchedTab,
    search: '',
  }),

  head: () => ({
    title: "Пользователи"
  }),

  mounted() {
    this.tab = this.tabs[0];
  }
})
</script>
