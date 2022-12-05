<template>
  <div>
    <ui-bank-details :banks="banks" @handlerClick="(bank) => openModal(bank)"/>

    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn text color="primary" @click="modals.create = true">
          Добавить
        </v-btn>

        <v-btn text color="primary">
          Сохранить
        </v-btn>
      </v-col>
    </v-row>

    <wrappers-modal-overlay
      v-model="modals.edit"
      mode="top"
      transition="dialog-bottom-transition"
    >
      <template #default="props">
        <modals-banks-edit
          :init-bank="{...selectedBank}"
          v-bind="props"
        />
      </template>
    </wrappers-modal-overlay>

    <wrappers-modal-overlay
      v-model="modals.create"
      mode="top"
      transition="dialog-bottom-transition"
    >
      <template #default="props">
        <modals-banks-create
          v-bind="props"
          :init-bank="{...selectedBank}"
        />
      </template>
    </wrappers-modal-overlay>
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import {IBank} from "~/plugins/api/banks.types";

export default Vue.extend({
  name: 'forms-banks',
  props: {
    initBanks: {
      type: Array,
      default: () => []
    } as PropOptions<Array<IBank>>
  },

  data () {
    return {
      banks: this.initBanks as Array<IBank>,
      modals: {
        edit: false,
        create: false
      },
      selectedBank: {} as IBank
    }
  },

  methods: {
    openModal (bank: IBank) {
      this.selectedBank = bank;
      this.modals.edit = true;
    }
  }
})
</script>
