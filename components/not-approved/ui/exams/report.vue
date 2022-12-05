<template>
  <div>
    <v-row dense class="mb-4 mx-0">
      <v-spacer></v-spacer>

      <v-col cols="auto" class="pr-0">
        <v-btn
          text
          color="primary"
          class="grey lighten-5"
        >
          <v-icon left>
            mdi-file
          </v-icon>
          Полный отчёт в формате .docx
        </v-btn>
      </v-col>
    </v-row>

    <v-list>
      <v-list-group
        v-for="group in examInfo.groups"
        :key="group.name"
        append-icon=""
        class="grey lighten-5"
        active-class="blue lighten-5"
      >
        <template #activator>
          <v-list-item-title>Группа: {{group.name}}</v-list-item-title>
        </template>
        <!--   Список курсов   -->
        <v-list-group
          v-for="course in group.courses"
          :key="course.name"
          append-icon=""
          prepend-icon=""
          class="grey lighten-5"
          active-class="blue lighten-6"
          sub-group
        >
          <template #activator>
            <v-list-item-title class="d-flex align-center">
              {{course.name}}

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
                    @click="createCourseDoc"
                  >
                    <v-icon>mdi-file</v-icon>
                  </v-btn>
                </template>
                <span>Отчёт по курсу</span>
              </v-tooltip>
            </v-list-item-title>
          </template>
          <!--   Список экзаменов в курсе   -->
          <v-expansion-panels
            accordion
            multiple
            :value="course.exams.map((exam, index) => index)"
          >
            <v-expansion-panel
              v-for="exam in course.exams"
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
                      @click="createCourseDoc"
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
                <v-row dense class="align-center mx-0">
                  <p>Потрачено попыток: {{exam.attempts}} / {{exam.max_attempts ? exam.max_attempts : '∞'}}</p>
                  <v-spacer></v-spacer>
                  <v-btn
                    depressed
                    text
                    color="primary"
                  >
                    Cбросить попытки
                  </v-btn>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <!--   Список экзаменов в курсе   -->

        </v-list-group>
        <!--   Список курсов   -->

      </v-list-group>
    </v-list>
  </div>
</template>
<script>

export default {
  name: 'group-form-exams-report',
  data: () => ({
    examInfo: {
      groups: [
        {
          name: 'Тест 123',
          courses: [
            {
              name: 'Курс 1',
              exams: [
                {
                  name: 'Выборочные вопросы из базы 21',
                  success: true,
                  module: "практика вне модуля",
                  attempts: 1,
                  max_attempts: null,
                  date_last_change: '02-08-2022',
                  time_last_change: '24 мин. 45 сек.',
                },
                {
                  name: 'Выборочные вопросы из базы 22',
                  success: true,
                  module: "практика в модуле",
                  attempts: 1,
                  max_attempts: 3,
                  date_last_change: '02-08-2022',
                  time_last_change: '8 мин. 41 сек.',
                }
              ]
            },
            {
              name: 'Курс 2',
              exams: [
                {
                  name: 'Выборочные вопросы из базы 23',
                  success: false,
                  module: "практика в модуле",
                  attempts: 1,
                  max_attempts: null,
                  date_last_change: '02-08-2022',
                  time_last_change: '24 мин. 45 сек.',
                },
                {
                  name: 'Выборочные вопросы из базы 24',
                  success: false,
                  attempts: 1,
                  module: "практика в модуле",
                  max_attempts: 3,
                  date_last_change: '02-08-2022',
                  time_last_change: '8 мин. 41 сек.',
                }
              ]
            }
          ]
        },
        {
          name: 'Тест 124',
          courses: [
            {
              name: 'Курс 1',
              exams: [
                {
                  name: 'Выборочные вопросы из базы 21',
                  success: true,
                  module: "практика вне модуля",
                  attempts: 1,
                  max_attempts: null,
                  date_last_change: '02-08-2022',
                  time_last_change: '24 мин. 45 сек.',
                },
                {
                  name: 'Выборочные вопросы из базы 22',
                  success: true,
                  module: "практика в модуле",
                  attempts: 1,
                  max_attempts: 3,
                  date_last_change: '02-08-2022',
                  time_last_change: '8 мин. 41 сек.',
                }
              ]
            },
            {
              name: 'Курс 2',
              exams: [
                {
                  name: 'Выборочные вопросы из базы 23',
                  success: false,
                  module: "практика в модуле",
                  attempts: 1,
                  max_attempts: null,
                  date_last_change: '02-08-2022',
                  time_last_change: '24 мин. 45 сек.',
                },
                {
                  name: 'Выборочные вопросы из базы 24',
                  success: false,
                  attempts: 1,
                  module: "практика в модуле",
                  max_attempts: 3,
                  date_last_change: '02-08-2022',
                  time_last_change: '8 мин. 41 сек.',
                }
              ]
            }
          ]
        }
      ]
    },

  }),
  mounted() {
    // Временное решение без API. Создает строку для скелета # list-item@2
    // this.skeleton = `list-item@${this.examInfo.groups.length}`
  },
  methods: {
    createCourseDoc (event) {
      event.stopPropagation()
    }
  }
}
</script>
<style scoped>
.group-wrapper {
  background: #f3f3f3;
}

.open-group {
  background: #f3f3f3;
}

.v-expansion-panel::before {
  box-shadow: none;
}

.v-expansion-panel-header .v-chip {
  flex: none;
}

.exam-info .v-expansion-panel-header {
  font-size: 16px;
}

</style>
