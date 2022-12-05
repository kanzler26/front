<template>
  <v-autocomplete
    v-model="v_model"
    item-value="name"
    :item-text="fieldForView"
    :rules="rules"
    label="Тип образования"
    :value="$attrs.value"
    :items="educationType"
    dense
  >
  </v-autocomplete>
</template>


<script lang="ts">
import Vue from "vue";
import selectMixin from "~/mixins/not-approved/select";
import {IDocName} from "~/plugins/api/users/users.types";
import VModel from "~/mixins/v-model";

export default Vue.extend({
  name: "form-select-education-name",
  mixins: [selectMixin, VModel],
  data: () => ({
    educationType: [
      {id: 2, name: "Высшее образование"},
      {id: 3, name: "Среднее образование"}
    ] as Array<IDocName>,
  }),
  async mounted () {
    console.log(await this.$axios.get('employer/education_names'));
  }
})
</script>
