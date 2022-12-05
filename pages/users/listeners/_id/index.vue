<template>
  <div class="grey lighten-4">
    <ui-wrapper class="px-3">
      <portal to="app-main-toolbar">
        <ui-toolbar back-to="/users" title="Информация о слушателе" divider>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </ui-toolbar>
      </portal>

      <template v-if="!loading">
        <v-expansion-panels :value="[0]" multiple accordion>
          <v-expansion-panel class="rounded-b-0 elevation-0">
            <v-expansion-panel-header class="">Общие данные</v-expansion-panel-header>
            <v-expansion-panel-content >
                <v-form ref="form" class="rounded-b-0">

                  <v-row class="mx-0 my-0">

                    <v-col cols="auto" class="p-0">
                      <workflow-image :image="info.files[0] ?? {}"/>
                    </v-col>

                    <v-col>
                      <v-row >
                        <v-col>
                          <v-text-field
                            v-model="info.name"

                            label="ФИО (обязательно)"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <inputs-position
                            v-model="info.position"
                            field-for-view="name"
                            label="Должность"

                            @change="selectedValue => info.position = selectedValue"
                          />
                        </v-col>
                        <v-col>
                          <inputs-counterpart
                            label="Контрагент"
                          />
                        </v-col>
                      </v-row>


                      <v-row >
                        <v-col cols="auto" class="mr-4">
                          <inputs-sex
                            v-model="info.sex"
                            label="Пол"
                          />
                        </v-col>

                        <v-col cols="auto">
                           <inputs-submitted-documents
                              v-model="submittedDocuments"
                              label="Персональные данные"
                           />
                        </v-col>
                      </v-row>

                      <v-row  class="mt-4">
                        <v-col>
                          <v-menu
                            :close-on-content-click="false"
                            :offset-y="true"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                v-model="info.student.birthdate"
                                readonly

                                label="Дата рождения"
                                v-bind="attrs"
                                clearable
                                v-on="on"
                              >
                              </v-text-field>
                            </template>
                            <v-date-picker v-model="info.student.birthdate" color="primary"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="info.student.birthplace"

                            label="Место рождения"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="info.student.snils"

                            label="Снилс"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <v-row >
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                      <v-btn
                        text
                        color="primary"
                      >
                        Сохранить
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <ui-switched-tabs :tabs="tabs" @change="tab => currentTab = tab"/>

        <v-divider></v-divider>

        <template v-if="currentTab.name === 'Основное'">
          <v-expansion-panels :value="[0]" multiple accordion>
            <v-expansion-panel>
              <v-expansion-panel-header class="">Данные паспорта</v-expansion-panel-header>
              <v-expansion-panel-content>
                <forms-passport :passport="info.student"/>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header class="">Образование</v-expansion-panel-header>
              <v-expansion-panel-content>
                <forms-education :education="info.education"/>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header class="">Контактные данные</v-expansion-panel-header>
              <v-expansion-panel-content>
                <forms-users-listeners-contacts/>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel v-if="info.fields.length">
              <v-expansion-panel-header class="">Дополнительные поля</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-form v-if="info.fields.length">
                  <v-row>
                    <v-col
                      v-for="field in info.fields"
                      :key="field.name"
                      cols="6"
                    >
                      <v-text-field
                        v-model="field.value"
                        :label="field.name"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row >
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                      <v-btn
                        text
                        color="primary"
                      >
                        Очистить форму
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                      >
                        Сохранить
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
        <template v-if="currentTab.name === 'Экзамены'">
          <v-expansion-panels :value="[0]" multiple accordion>
            <v-expansion-panel>
              <v-expansion-panel-header class="">Промежуточные</v-expansion-panel-header>
              <v-expansion-panel-content>
                <ui-exams-report/>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="">Итоговые</v-expansion-panel-header>
              <v-expansion-panel-content>
                <ui-exams-report/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
        <template v-if="currentTab.name === 'История'">
          <v-expansion-panels accordion multiple :value="[0]">
            <v-expansion-panel>
              <v-expansion-panel-header class="">Активность</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row  class="mb-4 mx-0">
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
                      Полный отчёт по активности
                    </v-btn>
                  </v-col>
                </v-row>

                <v-list-group
                  v-for="group in historyListener"
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
                      </v-list-item-title>
                    </template>
                    <!--   Список экзаменов в курсе   -->
                    <v-expansion-panels
                      accordion
                      multiple
                      :value="course.logs.map((exam, index) => index)"
                    >
                      <v-expansion-panel
                        v-for="log in course.logs"
                        :key="log.name"
                        class="exam-info"
                        active-class="grey lighten-5"
                        @click="() => {}"

                      >
                        <v-expansion-panel-header hide-actions class="font-weight-600">
                          <v-row  class="mx-0">
                            <v-col cols="auto" class="px-0">
                              {{log.name}}
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="auto" class="font-weight-medium px-0">
                              {{log.date_created}}
                            </v-col>
                          </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <p
                            v-for="paragraph in log.content"
                            :key="paragraph.label"
                          >
                            {{paragraph.label}}: {{paragraph.data}}
                          </p>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <!--   Список экзаменов в курсе   -->

                  </v-list-group>
                  <!--   Список курсов   -->

                </v-list-group>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-600">Сообщения</v-expansion-panel-header>
              <v-expansion-panel-content>
                В разработке
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
        <template v-if="currentTab.name === 'Документы'">
          <v-card>
            <v-card-text class="px-6">
              <ui-files-list-item
                v-for="(file, index) in files"
                :key="index"
                :file="file"
              />
            </v-card-text>
          </v-card>
        </template>
      </template>
    </ui-wrapper>
  </div>
</template>

<script  lang="ts">
import Vue from "vue";
import {
  IFullInfoListener,
} from "~/plugins/api/users/users.types";
import {ISwitchedTab} from "~/components/not-approved/ui/switched-tabs.vue";
import {IFile} from "~/components/not-approved/ui/form-input-file.vue";

export default Vue.extend({
  name: "listeners-info",
  layout: 'admin',
  data:() => ({
    loading: true as boolean,
    error: false as boolean,
    info: {} as IFullInfoListener,
    submittedDocuments: false,
    panels: [0],
    tabs: [
      {name: 'Основное', component: ''},
      {name: 'Экзамены', component: ''},
      {name: 'История', component: ''},
      {name: 'Документы', component: ''},
    ] as Array<ISwitchedTab>,
    files: [
      {name: 'Диплом', file: {}},
      {name: 'Диплом 1', file: {}},
      {name: 'Диплом 1', file: {}},
    ] as Array<{name: string, file: IFile | {}}>,
    currentTab: {} as ISwitchedTab,
    historyListener:  [
      {
        name: 'Тест 123',
        courses: [
          {
            name: "Охрана труда",
            logs: [
              {
                name: "Выдача документа",
                date_created: '02-08-2022',
                content: [
                  {
                    label: 'Номер удоставерения',
                    data: '-31/22'
                  },
                  {
                    label: 'дата выдачи',
                    data: '2022-07-28',
                  },
                  {
                    label: 'Действительно до',
                    data: '2024-08-02',
                  }
                ]
              },
              {
                name: 'Выдача документа 2',
                date_created: '02-08-2022',
                content: [
                  {
                    label: 'Номер удоставерения',
                    data: '-31/22'
                  },
                  {
                    label: 'дата выдачи',
                    data: '2022-07-28',
                  },
                  {
                    label: 'Действительно до',
                    data: '2024-08-02',
                  }
                ]
              }
            ]
          },
        ]
      },
    ],
    chatsListener: {
      groups: [

      ]
    }
  }),
  async mounted () {
    const userId = this.$route.params.id;
    this.info = await this.$api.users.readOne(Number(userId));
    this.loading = false;
    this.currentTab = this.tabs[0]
  }
})
</script>

<style scoped>
.v-expansion-panel::before {
  box-shadow: none;
}

</style>
