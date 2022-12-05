<template>
  <v-autocomplete
    item-value="id"
    hide-details
    :item-text="fieldForView"
    :label="label"
    :items="educations"
    :value="$attrs.value"
    clearable
    :dense="dense"
    @change="selectValue"
  >
  </v-autocomplete>
</template>


<script lang="ts">
import Vue, {PropOptions} from "vue";

import selectMixin from "~/mixins/not-approved/select";

export default Vue.extend({
  name: "form-select-manager",
  mixins: [selectMixin],
  props: {
    admins: {
      type: Array,
      default: () => []
    } as PropOptions<Array<any>>,
  },
  data: () => ({
    educations: [
      {id: 1, name: "Админ 1",},
      {id: 2, name: "Админ 2",}
    ] as Array<{id: number, name: string}>,
  }),
})
</script>
