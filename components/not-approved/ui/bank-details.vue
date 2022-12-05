<template>
  <div>
    <v-list v-if="banks.length">
      <v-list-item v-for="bank in banks" :key="bank.id" link @click="handlerClick(bank)">
        <v-list-item-content>
          <v-list-item-title class="d-flex flex-row mb-2">
            {{bank.name}}
            <v-spacer></v-spacer>
            {{bank.bik}}
          </v-list-item-title>
          <v-list-item-subtitle>{{bank.address}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-col v-else>Банковских реквизитов не добавлены</v-col>
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import {IBank} from "~/plugins/api/banks.types";

export default Vue.extend({
  name: 'bank-details',
  props: {
    banks: {
      type: Array,
      required: true,
      default: () => []
    } as PropOptions<Array<IBank>>
  },

  methods: {
    handlerClick (bank: IBank) {
      this.$emit('handlerClick', bank)
    }
  }
})
</script>
