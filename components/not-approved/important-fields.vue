<template>
  <div>

    <v-row >
      <v-col>
        <v-list  flat>
          <v-list-item v-for="( field, key ) in fields" :key="key">
            <v-list-item-action>
              <v-checkbox
                v-model="selected"
                :value="field.name"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ field.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-row >
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn text color="primary">Сохранить</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "settings-important-fields",
  data: () => ({
    selected: [],
    fields: [
      { value: 1, required: true, disabled: true, name: 'ФИО' },
      { value: 2, required: true, disabled: true, name: 'Пол' },
      { value: 3, required: true, disabled: true, name: 'СНИЛС' },
      { value: 4, required: true, disabled: true, name: 'Дата рождения' },
      { value: 5, required: false, disabled: false, name: 'Место рождения' },
      { value: 6, required: false, disabled: false, name: 'Адрес регистрации' },
      { value: 7, required: false, disabled: false, name: 'Фактический адрес' },
      { value: 8, required: false, disabled: false, name: 'Почтовый адрес' },
      { value: 9, required: false, disabled: false, name: 'Данные паспорта' },
      { value: 10, required: false, disabled: false, name: 'Телефон' },
      { value: 11, required: false, disabled: false, name: 'Электронная почта' },
      { value: 12, required: false, disabled: false, name: 'Данные об образовании' },
      { value: 13, required: false, disabled: false, name: 'Организация' },
      { value: 14, required: false, disabled: false, name: 'Должность' },
      { value: 15, required: false, disabled: false, name: 'Разряд' }
    ],
  })
})
</script>
