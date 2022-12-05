<template>
  <wrappers-modal-content hide-footer>
    <template #header>
      <v-btn
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Создание контрагента (юридическое лицо)</v-toolbar-title>
    </template>
    <template #body>
      <v-expansion-panels v-model="panels" multiple>
        <!--    Общие данные   -->
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold text-subtitle-1"> Контрагент (общие данные) </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form
              ref="form"
              v-model="isValidate"
              lazy-validation
            >

              <v-text-field
                v-model="formData.name"
                class="pt-2 pb-2"
                dense
                :rules="[$rules.notEmpty]"
                label="Наименование контрагента (обязательно)"
              />

              <forms-select-inn
                v-model="formData.inn"
              />

              <v-radio-group
                v-model="formData.sex"
                label="Пол (обязательно)"
                :rules="[$rules.notEmpty]"
              >

                <v-row dense>
                  <v-col cols="auto"> <v-radio label="мужской" value="male"></v-radio> </v-col>
                  <v-col cols="auto"> <v-radio label="женский" value="female"></v-radio> </v-col>
                </v-row>
              </v-radio-group>

              <v-row dense>
                <v-col>
                  <forms-select-manager
                    v-model="formData.manager_id"
                    label="Менеджер"
                    class="pt-2 pb-2"
                    @change="selectedValue => formData.manager_id = selectedValue"
                  />
                </v-col>
                <v-col>
                  <forms-select-group
                    v-model="formData.groupId"
                    label="Группа"
                    class="pt-2 pb-2"
                    @change="selectedValue => formData.groupId = selectedValue"
                  />
                </v-col>
              </v-row>

              <v-row dense>
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
import {IRefFormVuetify} from "~/types/default.types";

export default Vue.extend({
  name: 'modals-counterparties-individuals-create',
  data: () => ({
    isValidate: false as boolean,
    isLoading: false as boolean,
    formRef: {} as IRefFormVuetify,
    formData: {
      name: "",
      inn: "",
      groupId: null,
      sex: "",
    },
    panels: [0]
  }),

  mounted  () {
    // @ts-ignore
    this.formRef = this.$refs.form;
  },

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
