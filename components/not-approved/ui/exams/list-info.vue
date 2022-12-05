<template>
  <v-expansion-panels
    v-model="panels"
    accordion
    multiple
  >
    <v-expansion-panel
      v-for="exam in exams"
      :key="exam.name"
      class="exam-info"
      active-class="grey lighten-5"
      @click="() => {}"

    >
      <v-expansion-panel-header hide-actions class="font-weight-600">
        {{exam.name}}
        <v-chip
          label
          small
          text-color="white"
          class="ma-3"
          :color="exam.success ? 'success' : 'red'"
        >
          {{exam.success ? 'Сдано' : 'Не сдано'}}
        </v-chip>

        <v-chip
          label
          small
          text-color="white"
          color="grey"
          class="mr-3"
        >
          {{exam.module}}
        </v-chip>
        <v-spacer></v-spacer>

        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              width="48"
              height="48"
              color="primary"
              small
              v-bind="attrs"
              class="flex-grow-0 create-document"
              v-on="on"
              @click="createExamDocument"
            >
              <v-icon>mdi-file</v-icon>
            </v-btn>
          </template>
          <span>Отчёт по экзамену</span>
        </v-tooltip>

      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>Время последней попытки сдачи: {{exam.time_last_change}} </p>
        <p>Дата последней попытки сдачи: {{exam.date_last_change}}</p>
        <p>Попыток: {{exam.attempts}} / {{exam.max_attempts ? exam.max_attempts : '∞'}}</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'exam-list-info',
  props: {
    exams: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data: () => ({
    panels: [],
  }),
  mounted() {
    this.panels = this.exams.map((exam, index) => {
      console.log(exam);
      return index
    });
  },
  methods: {
    createExamDocument (event) {
      event.stopPropagation()
      console.log('create document')
    }
  }
}
</script>

<style scoped>

.v-expansion-panel-header .v-chip {
  flex: none;
}

.exam-info .v-expansion-panel-header {
  font-size: 16px;
}
</style>
