<template>
    <v-form
      ref="form"
      v-model="isValidate"
      lazy-validation
    >
      <v-row dense>
        <v-col>
          <v-text-field
            v-model="formData.phone"
            dense
            label="Телефон"
            class="pt-2 pb-2"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="formData.additional"
            dense
            label="Доп."
            class="pt-2 pb-2"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="formData.email"
            dense
            label="Email"
            class="pt-2 pb-2"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col>
          <v-text-field
            v-model="formData.address_reg"
            dense
            label="Адресс регистрации"
            class="pt-2 pb-2"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="formData.address_actual"
            dense
            label="Фактический адресс"
            class="pt-2 pb-2"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="formData.email_address"
            dense
            label="Почтовый адресс"
            class="pt-2 pb-2"
          ></v-text-field>
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
</template>

<script lang="ts">
import Vue from "vue";
import {IRefFormVuetify} from "~/types/default.types";
export default Vue.extend({
  name: "users-form-contacts",
  data: () => ({
    isValidate: false as Boolean,
    isLoading: false as Boolean,
    formRef: {} as IRefFormVuetify,
    formData: {
      phone: "",
      additional: "",
      email: "",
      address_reg: "",
      address_actual: "",
      email_address: "",
    }
  }),

  mounted  () {
    // @ts-ignore
    this.formRef = this.$refs.form
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

