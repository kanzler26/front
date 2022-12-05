<template>
  <v-radio-group
    v-model="v_model"
    label="Перональные данные"
    :rules="rules"
    class="mt-0 mb-2"
    :hide-details="hideDetails"
    :dense="dense"
    @change="selectValue"
  >
    <v-row dense>
      <v-col
        v-for="boolean in [{label: 'cдано', value: true}, {label:'не cдано', value: false}]"
        :key="boolean.value"
        cols="auto"
      >
        <v-radio :label="boolean.label" :value="boolean.value"></v-radio>
      </v-col>
    </v-row>
  </v-radio-group>
</template>

<script lang="ts">
import Vue from "vue";
import selectMixin from "~/mixins/not-approved/select";
import VModel from "~/mixins/v-model";

export default Vue.extend({
  name: 'form-select-submitted-documents',
  mixins: [selectMixin, VModel],
})
</script>
