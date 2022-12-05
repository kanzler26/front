<template>
  <v-tabs
    height="64px"
    slider-color="none"
    align-with-title
  >

    <v-tab
      v-for="currentTab in tabs"
      :key="currentTab.name"
      active-class="tab-active"
      @click="changeTab(currentTab)"
    >
      {{currentTab.name}}
    </v-tab>

  </v-tabs>
</template>

<script lang="ts">

// Типы && Прототипы
import Vue from "vue";

export interface ISwitchedTab {
  name: string,
  component: string
}

export interface ISwitchedTabsComponent {
  tabs: Array<ISwitchedTab>,
  color?: string
}

export default Vue.extend({
  name: "switched-tabs",
  props: {
    tabs: {
      required: true,
      type: Array as () => Array<ISwitchedTab> | [],
    },
    color: {
      default: "blue",
      type: String,
    },
  },

  data: () => ({
    tab: {
      name: "",
      component: ""
    } as ISwitchedTab
  }),

  computed: {

  },

  methods: {
    changeTab(currentTab: ISwitchedTab): void {
      this.tab = currentTab;
      this.$emit('change', currentTab)
    }
  }
})

</script>

<style scoped>
  .v-tab {
    margin-left: 0 !important;
  }

  .tab-active {
    font-weight: 600;
    background: white;
  }

</style>
