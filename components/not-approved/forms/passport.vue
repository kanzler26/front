<template>
  <v-form
        ref="form"
        v-model="isValidate"
      >
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="formData.passport_series"
              :rules="[$rules.passport_series, $rules.notEmpty]"
              dense
              label="Серия паспорта (обязательно)"
              class="pt-2 pb-2"
              clearable
            >
            </v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="formData.passport_number"
              :rules="[$rules.passport_number, $rules.notEmpty]"
              dense
              label="Номер паспорта (обязательно)"
              clearable
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
                  clearable
                  v-bind="attrs"
                  class="pt-2 pb-2"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker v-model="formData.passport_date_issue" color="primary"></v-date-picker>
            </v-menu>
          </v-col>

        </v-row>

        <v-row dense>
          <v-text-field
            v-model="formData.passport_place_issue"
            dense
            label="Место выдачи паспорта"
            clearable
          >
          </v-text-field>
        </v-row>

        <v-row dense>
          <v-spacer></v-spacer>
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
          </v-col>
        </v-row>
      </v-form>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import {IStudent} from "~/plugins/api/users/users.types";
import {IRefFormVuetify} from "~/types/default.types";

export default Vue.extend({
  name: "forms-users-passport",
  props: {
    passport: {
      type: Object as PropType<IStudent>,
      default: () => {},
    }
  },

  data: () =>  ({
    formData: Object as any,
    isValidate: false,
    formRef: {} as IRefFormVuetify,
  }),

  mounted () {
    this.formData = this.passport;

    // @ts-ignore
    this.formRef = this.$refs.form;
  },

  methods: {
    submit () {
      this.$emit('submit', this.formData);
    },

    clear () {
      this.formRef.reset();
    }
  }
})
</script>
