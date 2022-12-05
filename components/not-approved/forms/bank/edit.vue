<template>
  <v-form :readonly="readonly">
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

    <v-row>
      <v-spacer></v-spacer>

      <v-col cols="auto">

        <slot v-if="!$scopedSlots.footer" name="appendActions"></slot>

        <template v-if="!$scopedSlots.footer">
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
        </template>

        <slot name="footer"></slot>


      </v-col>

    </v-row>

  </v-form>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import { modalMixin } from "~/mixins";
import {IBank} from "~/plugins/api/banks.types";

export default Vue.extend({
  name: 'banks-edit',
  mixins: [modalMixin],
  props: {
    value: {
      type: Object,
      default: () => {},
    } as PropOptions<IBank>,
    readonly: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>,
  },

  computed: {
    bank (): IBank {
      return this.value
    }
  }

})
</script>

