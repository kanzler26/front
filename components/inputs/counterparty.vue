<template>
  <v-autocomplete
    item-value="id"
    :item-text="fieldForView"
    :label="label"
    :rules="rules"
    :items="loadedCounterparties"
    :value="$attrs.value"
    dense
    @change="selectValue"
  >
  </v-autocomplete>
</template>


<script lang="ts">
import Vue, {PropOptions} from "vue";
import selectMixin from "~/mixins/not-approved/select";

export default Vue.extend({
  name: "form-select-counterpart",
  mixins: [selectMixin],
  props: {
    counterparties: {
      type: Array,
      default: () => []
    } as PropOptions<Array<any>>,
  },
  data: () => ({
    loadedCounterparties: [{name: "test",}] as Array<{name: string}>,
  }),
})
</script>
