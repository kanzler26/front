<template>
  <div>
    <v-autocomplete
      item-value="id"
      hide-details
      :rules="rules"
      :item-text="fieldForView"
      :label="label"
      :items="loadedPositions"
      :value="$attrs.value"
      :dense="dense"
      clearable
      @change="selectValue"
    >
    </v-autocomplete>
  </div>
</template>


<script lang="ts">
import Vue, {PropOptions} from "vue";

import {IPosition} from "~/plugins/api/users/users.types";
import selectMixin from "~/mixins/not-approved/select";

export default Vue.extend({
  name: "form-select-position",
  mixins: [selectMixin],
  props: {
    positions: {
      type: Array,
      default: () => []
    } as PropOptions<Array<IPosition>>,
  },

  data: () => ({
    loadedPositions: [
      {
        check_number:4,
        code:11802,
        etks:"01",
        id:918,
        name:"Дежурный у эскалатора",
        okz:8312,
        range_ranks:"2",
        type:"worker",
      }
    ] as Array<IPosition>,
    loading: true
  }),

  mounted () {
    //
  },
})
</script>
