<template>
  <v-radio-group
    v-model="v_model"
    :label="label"
    :rules="rules"
    class="mt-0"
    :hide-details="hideDetails"
    :dense="dense"
    @change="selectValue"
  >

    <v-row dense>
      <v-col
        v-for="sex in sexs"
        :key="sex.value"
        cols="auto"
      >
        <v-radio :label="sex.label" :value="sex.value"></v-radio>
      </v-col>
    </v-row>
  </v-radio-group>
</template>
<script lang="ts">
import Vue from "vue";

import {ISex} from "~/plugins/api/users/users.types";
import selectMixin from "~/mixins/not-approved/select";
import VModel from "~/mixins/v-model";

export default Vue.extend({
  name: "form-select-sex",
  mixins: [selectMixin, VModel],
  data: () => ({
    sexs: [
      {label: "мужской", value: "male"},
      {label: "женский", value: "female"},
    ] as Array<{label: string, value: ISex}>
  }),
})
</script>
