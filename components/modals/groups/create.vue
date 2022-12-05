<template>
  <wrappers-modal-content hide-footer>
    <template #header>
      <v-btn
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Добавление группы</v-toolbar-title>
    </template>
    <template #body>
      <v-expansion-panels v-model="panels" multiple>

        <!--    Общие данные   -->
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold text-subtitle-1"> Группа (общие данные) </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form
              ref="form"
              v-model="isValidate"
              lazy-validation
            >
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formData.name"
                    dense
                    label="Наименование"
                    :rules="[$rules.notEmpty]"
                    class="pt-2 pb-2"
                  />
                </v-col>
                <v-col>
                  <inputs-education
                    v-model="formData.education"
                    class="pt-2 pb-2"
                    label="Форма обучения"
                    :rules="[$rules.notEmpty]"
                    @change="selectedValue => formData.education = selectedValue"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-menu :close-on-content-click="false" max-width="290px" offset-y>
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-model="formData.education_date.preview"
                        class="pt-2 pb-2"
                        readonly
                        dense
                        label="Начало/конец обучения"
                        :rules="[$rules.notEmpty]"
                        clearable
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="formData.education_date.rangeDate" color="primary" range></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col>
                  <v-menu :close-on-content-click="false" max-width="290px" offset-y>
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-model="formData.exam_date.preview"
                        class="pt-2 pb-2"
                        readonly
                        dense
                        label="Дата экзамена"
                        :rules="[$rules.notEmpty]"
                        clearable
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="formData.exam_date.rangeDate" color="primary" range @change="changeExamDate"></v-date-picker>
                  </v-menu>
                </v-col>

              </v-row>

              <v-row>
                <v-col>
                  <v-menu :close-on-content-click="false" max-width="290px" offset-y>
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-bind="attrs"
                        v-model="formData.access_to"
                        class="pt-2 pb-2"
                        readonly
                        dense
                        label="Доступ к материалу до"
                        :rules="[$rules.notEmpty]"
                        clearable
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="formData.access_to" v-mask="$masks.time" color="primary"/>
                  </v-menu>
                </v-col>
                <v-col>
                  <inputs-manager
                    v-model="formData.manager"
                    class="pt-2 pb-2"
                    label="Менеджер"
                    :rules="[$rules.notEmpty]"
                    @change="selectedValue => formData.manager = selectedValue"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                  <v-btn
                    text
                    color="primary"
                    @click="clear"
                  >
                    Очистить форму
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="submit"
                  >
                    Сохранить
                  </v-btn>
                </v-col>
              </v-row>

            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!--    Общие данные   -->

      </v-expansion-panels>
    </template>
  </wrappers-modal-content>
</template>

<script lang="ts">
import Vue from "vue";
import { modalMixin } from "~/mixins";
import {IRefFormVuetify} from "~/types/default.types";

export default Vue.extend({
  name: "groups-create",
  mixins: [modalMixin],
  data: () => ({
    isValidate: false as boolean,
    isLoading: false as boolean,
    formRef: {} as IRefFormVuetify,
    formData: {
      name: "",
      education: "",
      education_date: {
        preview: "",
        rangeDate: [],
      },
      exam_date: {
        preview: "",
        rangeDate: [],
      },
      access_to: "",
      manager: "",
    },
    panels: [0]
  }),
  methods: {
    submit () {
      this.formRef.validate();
    },
    clear () {
      this.formRef.reset();
    }
  }
})

</script>
