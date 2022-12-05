<template>
  <v-form
    ref="form"
    v-model="isValidate"
    lazy-validation
  >

    <forms-select-inn
      v-model="formData.inn"
    />

    <v-text-field
      v-model="formData.name"
      class="pt-2 pb-2"
      dense
      label="Краткое наименование (обязательно)"
    />

    <v-text-field
      v-model="formData.name_full"
      class="pt-2 pb-2"
      dense
      label="Полное наименование (обязательно)"
    />

    <v-row dense>
      <v-col>
        <v-text-field
          v-model="formData.management_name"
          class="pt-2 pb-2"
          dense
          label="Фио руководителя"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="formData.management_name"
          class="pt-2 pb-2"
          dense
          label="Должность руководителя"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col>
        <v-text-field
          v-model="formData.ogrn"
          class="pt-2 pb-2"
          dense
          label="ОГРН"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="formData.okato"
          class="pt-2 pb-2"
          dense
          label="ОКАТО"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="formData.okogu"
          class="pt-2 pb-2"
          dense
          label="ОКОГУ"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col>
        <v-text-field
          v-model="formData.okpo"
          class="pt-2 pb-2"
          dense
          label="ОКПО"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="formData.okfs"
          class="pt-2 pb-2"
          dense
          label="ОКФС"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="formData.oktmo"
          class="pt-2 pb-2"
          dense
          label="ОКТМО"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="formData.kpp"
          class="pt-2 pb-2"
          dense
          label="КПП"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col>
        <v-text-field
          v-model="formData.city"
          class="pt-2 pb-2"
          dense
          label="Город"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="formData.postal_code"
          class="pt-2 pb-2"
          dense
          label="Почтовый индекс"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="formData.address"
          class="pt-2 pb-2"
          dense
          label="Адресс"
        />
      </v-col>
    </v-row>

    <v-row dense>
     <v-col>
       <forms-select-counterpart-type
         v-model="formData.type"
         class="pt-2 pb-2"
         label="Тип контрагента"
         @change="selectedValue => formData.type = selectedValue"
       />
     </v-col>

      <v-col>
        <forms-select-manager
          v-model="formData.manager_id"
          label="Должность"
          class="pt-2 pb-2"
          :emit-select="selectedValue => formData.manager_id = selectedValue"
        />
      </v-col>
    </v-row>

    <v-text-field
      v-model="formData.email"
      class="pt-2 pb-2"
      dense
      label="Адрес электронной почты"
    />

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
import {
  CounterpartiesApiPayload
} from "~/plugins/api/counterparties/counterparties.type";
import {IRefFormVuetify} from "~/types/default.types";

export default Vue.extend({
  name:'group-form-common',
  data: () => ({
    isValidate: false as boolean,
    isLoading: false as boolean,
    formRef: {} as IRefFormVuetify,
    formData: {
      inn: "",
      name: "",
      manager_id: "",
      management_name: "",
      management_position: "",
      ogrn: "",
      okato: "",
      okogu: "",
      okpo: "",
      okfs: "",
      oktmo: "",
      kpp: "",
      city: "",
      postal_code: "",
      type: "",
      email: ""
    } as CounterpartiesApiPayload
  }),

  mounted () {
    // @ts-ignore
    this.formRef = this.$refs.form;
  },

  methods: {
    submit () {

    },

    clear () {
        this.formRef.reset()
    }
  }
})
</script>
