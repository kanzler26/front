<template>
  <wrappers-modal-content>
    <template #header>
      <v-toolbar-title>Информация о {{initBank.bik}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <template #body>
      <v-form>
        <v-row dense>
          <v-text-field
            v-model="bank.name"
            label="Наименование банка"
            clearable
          >

          </v-text-field>
        </v-row>
        <v-row dense>
          <v-text-field
            v-model="bank.address"
            label="Адресс"
            clearable
          >

          </v-text-field>
        </v-row>
        <v-row dense>
          <v-text-field
            v-model="bank.city"
            label="Город"
            clearable
          >

          </v-text-field>
        </v-row>
        <v-row dense>
          <v-text-field
            v-model="bank.correspondent_account"
            label="Корр счёт"
            clearable
          >

          </v-text-field>
        </v-row>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="bank.bik"
              label="БИK"
              clearable
            >

            </v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="bank.kpp"
              label="КПП"
              clearable
            >

            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </template>

    <template #footer>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            text
            color="error"
            @click="close"
          >
            Закрыть
          </v-btn>
          <v-btn
            text
            color="primary"
          >
            Сохранить изменения
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </wrappers-modal-content>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import { modalMixin } from "~/mixins";
import {IBank} from "~/plugins/api/banks.types";

export default Vue.extend({
  name: 'modals-banks-edit',
  mixins: [modalMixin],
  props: {
    initBank: {
      type: Object,
      default: () => {},
    } as PropOptions<IBank>
  },

  data () {
    return {
      bank: this.initBank as IBank
    }
  },

})
</script>
