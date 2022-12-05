<template>
    <v-form>
      <v-row>
        <v-col>
          <inputs-education-type v-model="formData.name"/>
        </v-col>
        <v-col>
          <inputs-education-doc-name v-model="formData.doc_name"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="formData.series"
            dense
            label="Серия"
            :rules="[$rules.length.max(256)]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="formData.number"
            dense
            label="Номер"
            :rules="[$rules.length.max(50)]"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-menu
            :close-on-content-click="false"
            :offset-y="true"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="formData.date_issue"
                readonly
                dense
                label="Дата выдачи"
                v-bind="attrs"
                v-on="on"
              >
              </v-text-field>
            </template>
            <v-date-picker v-model="formData.date_issue" color="primary"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="formData.user_name"
            label="ФИО в документе об образовании"
            :rules="[$rules.length.max(256)]"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="formData.place_issue"
            label="Место выдачи документа об образовании"
          ></v-text-field>
        </v-col>
      </v-row>


      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            text
            color="primary"
          >
            Очистить
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
</template>
<script lang="ts">
import Vue, {PropOptions} from "vue";
import {IEducation} from "~/plugins/api/users/users.types";

export default Vue.extend({
  name: "forms-users-education",
  props: {
    education: {
      type: Object,
      default: () => {},
      required: true
    } as PropOptions<IEducation | {}>
  },
  data: () => ({
      loading: true,
      formData: {
        date_issue: null,
        doc_name: {
          id: 0,
          name: ""
        },
        name: {},
        number: null,
        place_issue: null,
        series: null,
        user_name: ""
      } as IEducation
  }),

  mounted() {}
})
</script>
