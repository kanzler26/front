<template>
  <v-autocomplete
    item-value="name"
    :item-text="fieldForView"
    :label="label"
    :items="educations"
    :value="$attrs.value"
    dense
    @change="selectValue"
  >
  </v-autocomplete>
</template>


<script lang="ts">
import Vue from "vue";
import selectMixin from "~/mixins/not-approved/select";

export default Vue.extend({
  name: "form-select-education",
  mixins: [selectMixin],
  data: () => ({
    educations: [
      {
        id: 1,
        name: "очная",
      },
      {
        id: 2,
        name: "заочная",
      }
    ] as Array<{id: number, name: string}>,
  }),
})
</script>
