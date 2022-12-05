<template>
  <v-card class="px-0" flat>
    <v-card-title class="px-0 py-0 pb-4 text-subtitle-1">
      <v-btn-toggle dense class="float-right mr-4" borderless mandatory>
        <v-btn outlined icon value="calendar">
          <v-icon>mdi-calendar-month-outline </v-icon>
        </v-btn>
        <v-btn outlined icon value="table">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle v-model="type" dense class="float-right" borderless mandatory>
        <v-btn outlined value="day">День</v-btn>
        <v-btn outlined value="week">Неделя</v-btn>
        <v-btn outlined value="month">Месяц</v-btn>
      </v-btn-toggle>

      <v-spacer></v-spacer>

      <v-btn icon color="error">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn class="mx-4" outlined small>Сегодня</v-btn>
      <v-btn class="mr-4" icon color="error">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-btn class="mr-4" color="success" icon>
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>

      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon> mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Настройки</span>
      </v-tooltip>

    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="px-0">
      <v-sheet style="height: calc( 100vh - 64px - 64px - 64px - 64px - 10px ); min-height: 500px;">
        <v-calendar
          ref="calendar"
          v-model="today"
          color="primary"
          :type="type"
          :event-ripple="false"
          :events="events"
        >
          <template #event="{ event, timed, eventSummary }">
            <span :class="[ 'v-event-draggable', event.ended ? 'text-decoration-line-through' : null ]">{{eventSummary()}}</span>
            <div v-if="timed" class="v-event-drag-bottom"></div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "calendar-index-page",
  layout: "admin",
  data: () => ({
    type: "month",
    today: "",
    events: [],
  })
})
</script>
