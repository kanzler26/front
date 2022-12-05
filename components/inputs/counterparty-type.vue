<template>
  <v-autocomplete
    item-value="text"
    item-text="text"
    :label="label"
    :rules="rules"
    :items="counterpartTypes"
    :value="$attrs.value"
    dense
    @change="selectValue"
  >
  </v-autocomplete>
</template>


<script lang="ts">
import Vue from "vue";

import selectMixin from "~/mixins/not-approved/select";
import {
  CounterpartyType
} from "~/plugins/api/counterparties/counterparties.type";

interface IFormCounterpartType {
  text: string,
  type: CounterpartyType
}

export default Vue.extend({
  name: "form-select-counterpart-type",
  mixins: [selectMixin],
  data: () => ({
    counterpartTypes: [
      {
        text: 'Юридичесое лицо',
        type: 'legal'
      },
      {
        text: 'Индивидуальный предприниматель',
        type: 'individual'
      }
    ] as Array<IFormCounterpartType>,
  }),
})
</script>
