<template>
  <ui-container>

    <template #toolbar>
      <ui-toolbar title="Сделки / Обучение" divider>
        <v-btn icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </ui-toolbar>
    </template>

    <draggable
      v-model="deals.sections"
      v-bind="dragOptions"
      style="height: 100%"
      group="sections"
      class="deals-sections ui-row-5"
      handle=".handle"
      draggable=".section"
      @start="drag=true"
      @end="drag=false"
    >
      <ui-deals-section
        v-for="section in deals.sections"
        :key="section.id"
        :name="section.name"
        :color="section.color"
        class="section"
      >
        <draggable
          v-model="section.items"
          v-bind="dragOptions"
          style="height: 100%"
          group="deals"
          @start="drag=true"
          @end="drag=false"
        >
          <ui-deals-item
            v-for="item in section.items"
            :key="item.id"
            :text="item.name"
          />
        </draggable>
      </ui-deals-section>
      <ui-deals-section @click="addSection">
        <div class="ui-row-5 d-flex align-center justify-center" style="height: 100%;">
          <v-icon size="70" class="grey--text text--lighten-1">mdi-plus</v-icon>
        </div>
      </ui-deals-section>
    </draggable>

  </ui-container>
</template>

<script lang="ts">

import Vue from "vue"

// @ts-ignore
import draggable from 'vuedraggable'

// todo: scrolling

export default Vue.extend({
  name: "deals-index-page",
  components: {
    draggable
  },
  layout: "admin",
  data: () => ({
    drag: false,
    deals: {
      name: 'Обучение',
      sections: [
        {
          id: 1,
          name: 'Заявки',
          color: '#27ae60',
          items: [
            { id: 1, name: 'Сделка 1' },
            { id: 2, name: 'Сделка 2' },
            { id: 3, name: 'Сделка 3' },
          ]
        },
        {
          name: 'Звонок',
          color: '#1c5fa1',
          id: 2,
          items: [
            { id: 4, name: 'Сделка 4' },
            { id: 5, name: 'Сделка 5' },
            { id: 6, name: 'Сделка 6' },
          ]
        },
        {
          name: 'Супер',
          color: '#6b27ad',
          id: 3,
          items: [
            { id: 7, name: 'Сделка 4' },
            { id: 8, name: 'Сделка 5' },
            { id: 9, name: 'Сделка 6' },
          ]
        }
      ]
    }
  }),
  computed: {
    dragOptions: () => ({
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "dnd-deals-card-ghost"
    })
  },
  methods: {
    addSection () {
      console.log( 'addSection' )
    }
  },
})
</script>

<style>
/* todo: css bug on scrolling deals sections */

.deals-wrapper {
  background: #f3f3f3;
}

.deals-sections {
  display: flex;
  height: 100%;
  overflow-x: auto;
}

.deals-sections > * {
  min-width: 0;
  margin: 0;
}

.dnd-deals-card-ghost {
  opacity: 0.5;
}

</style>
