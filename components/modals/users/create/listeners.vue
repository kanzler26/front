<template>
  <wrappers-modal-content hide-footer>
    <template #header>
      <v-btn
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Создание слушателя</v-toolbar-title>
    </template>
    <template #body>
      <v-expansion-panels v-model="panels" multiple>
        <!--    Общие данные   -->
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold text-subtitle-1"> Слушатель (общие данные) </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form
              ref="form"
              v-model="isValidate"
              lazy-validation
            >
              <v-row class="mb-3">
                <v-col cols="auto">
                  <workflow-image :image="formData.avatar" click-to-upload/>
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="formData.name"
                    :rules="[$rules.notEmpty]"
                    dense
                    label="ФИО (обязательно)"
                  ></v-text-field>


                  <forms-select-sex
                    v-model="formData.sex"
                    label="Пол (обязательно)"
                    :rules="[$rules.notEmpty]"
                  />

                  <v-checkbox
                    v-model="formData.agree"
                    :rules="[$rules.notBoolean]"
                    class="py-0"
                    hide-details
                  >
                    <template #label>
                      <small> <b> Согласие на обработку персональных данных </b> </small>
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <forms-select-position
                    v-model="formData.position"
                    label="Должность (обязательно)"
                    :rules="[$rules.notEmpty]"
                    @change="selectedValue => formData.position = selectedValue"
                  />
                </v-col>
                <v-col>
                  <forms-select-counterpart
                    v-model="formData.counterpart"
                    label="Контрагент (обязательно)"
                    :rules="[$rules.notEmpty]"
                    @change="selectedValue => formData.counterpart = selectedValue"
                  />
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="formData.snils"
                    v-mask="$masks.snils"
                    :rules="[$rules.snils]"
                    dense
                    label="Снилс"
                    class="pt-2 pb-2"
                  >
                  </v-text-field>
                </v-col>

                <v-col>
                  <v-menu
                    :close-on-content-click="false"
                    :offset-y="true"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="formData.birthdate"
                        :rules="[$rules.notEmpty]"
                        readonly
                        dense
                        label="Дата рождения (обязательно)"
                        v-bind="attrs"
                        clearable class="pt-2 pb-2"
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker v-model="formData.birthdate" color="primary"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="formData.passport_series"
                    :rules="[$rules.passport_series]"
                    dense
                    label="Серия паспорта"
                    class="pt-2 pb-2"
                  >
                  </v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="formData.passport_number"
                    :rules="[$rules.passport_number]"
                    dense
                    label="Номер паспорта"
                    class="pt-2 pb-2"
                  >
                  </v-text-field>
                </v-col>

                <v-col>
                  <v-menu
                    :close-on-content-click="false"
                    :offset-y="true"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="formData.passport_date_issue"
                        readonly
                        dense
                        label="Дата выдачи"
                        v-bind="attrs"
                        clearable class="pt-2 pb-2"
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker v-model="formData.passport_date_issue" color="primary"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-text-field
                    v-model="formData.birthplace"
                    dense
                    label="Место рождения"
                    class="pt-2 pb-2"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="formData.passport_place_issue"
                    dense
                    label="Место выдачи паспорта"
                    class="pt-2 pb-2"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="auto">
                  <v-btn
                    text
                    color="primary"
                    @click="clear"
                  >
                    Очистить
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="submit"
                  >
                    Сохранить
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="submitAndNext"
                  >
                    Сохранить и продолжить
                  </v-btn>
                </v-col>
              </v-row>

            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </wrappers-modal-content>
</template>

<script lang="ts">
import Vue from "vue";
import { modalMixin } from "~/mixins";
import {ICreateListener} from "~/plugins/api/users/users.types";
import {IRefFormVuetify} from "~/types/default.types";

export default Vue.extend({
  name: "modals-users-listeners-create",
  mixins: [modalMixin],
  props: {
    data: {
      type: Object as any,
      required:false,
      default: () => {},
    }
  },
  data: () => ({
    isValidate: false as Boolean,
    isLoading: false as Boolean,
    formRef: {} as IRefFormVuetify,
    formData: {
      avatar: {},
      name: "",
      sex: "male",
      agree: true,
      position: {},
      counterpart: {},
      snils: "",
      birthdate: "",
      birthplace: "",
      passport_series: "",
      passport_number: "",
      passport_date_issue: "",
      passport_place_issue: "",
    } as ICreateListener | {},
    panels: [0]
  }),

  mounted  () {
    // @ts-ignore
    this.formRef = this.$refs.form;
  },

  methods: {
    submit () {
      this.formRef.validate();
      if(this.formRef.validate()) {
        this.$emit('submit', {id: new Date().getSeconds(), ...this.formData});
      }
    },

    submitAndNext () {
      const customId = new Date().getSeconds();

      if(this.formRef.validate()) {
        this.$router.replace(`/users/listeners/${customId}`);
      }

    },

    clear () {
      this.formRef.reset();
    }
  }
})
</script>
