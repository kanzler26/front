<template>
  <wrappers-modal-content hide-footer>
    <template #header>
      <v-btn
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-toolbar-title>Создание членов комиссии</v-toolbar-title>
    </template>
    <template #body>
      <v-expansion-panels v-model="panels" multiple>

        <!--    Общие данные  -->
        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold text-subtitle-1"> Член коммисии (общие данные) </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form
              ref="form"
              v-model="isValidate"
              lazy-validation
            >

              <v-text-field
                v-model="formData.name"
                dense
                label="ФИО (обязательно)"
                :rules="[$rules.notEmpty]"
                class="pt-2 pb-2"
              />

              <forms-select-position
                v-model="formData.position"
                class="pt-2 pb-2"
                label="Должность (обязательно)"
                :rules="[$rules.notEmpty]"
                @change="selectedValue => formData.position = selectedValue"
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
        <!--    Общие данные  -->

      </v-expansion-panels>
    </template>
  </wrappers-modal-content>
</template>

<script lang="ts">
import Vue from "vue";
import { modalMixin } from "~/mixins";
import {IRefFormVuetify} from "~/types/default.types";
export default Vue.extend({
  name: "modals-users-commissions-create",
  mixins: [modalMixin],
  data: () => ({
    panels: [0],
    isValidate: false as Boolean,
    isLoading: false as Boolean,
    formRef: {} as IRefFormVuetify,
    formData: {
      name: "",
      position: "",
      role: "",
      phone: "",
      email: "",
      sex: "",
      is_commission_member: false
    }
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
