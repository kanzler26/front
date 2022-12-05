<template>
  <v-autocomplete
    item-value="id"
    item-text="name"
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
  GroupsApiPayload
} from "~/plugins/api/groups/groups.type";

export default Vue.extend({
  name: "form-select-group",
  mixins: [selectMixin],
  data: () => ({
    counterpartTypes: [
      {
        id: 1,
        name: "Группа 1",
      },
      {
        id: 2,
        name: "Группа 2",
      }
    ] as Array<Partial<GroupsApiPayload>>,
  }),
})
</script>
