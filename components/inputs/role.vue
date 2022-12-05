<template>
  <v-autocomplete
    item-value="id"
    :item-text="fieldForView"
    :rules="rules"
    :label="label"
    :items="roles"
    :value="$attrs.value"
    dense
    @change="selectValue"
  >
  </v-autocomplete>
</template>


<script lang="ts">
import Vue from "vue";
import selectMixin from "~/mixins/not-approved/select";
import {RolesApiPayload} from "~/plugins/api/roles/roles.type";

export default Vue.extend({
  name: "form-select-role",
  mixins: [selectMixin],
  data: () => ({
    roles: [{id: 1, name: "admin"}] as Array<RolesApiPayload>,
    once: false,
    page: 0,
  }),
})
</script>
