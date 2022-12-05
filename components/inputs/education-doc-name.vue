<template>
  <v-select
    v-model="vModelValue"
    item-value="id"
    item-text="name"
    :label="label"
    :items="education_doc_names"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { vmodelMixin } from "~/mixins"
import {
  EducationDocNamesApiPayload
} from "~/plugins/api/education-doc-names/education-doc-names.type"
export default Vue.extend({
  name: "form-select-education-doc-name",
  mixins: [
    vmodelMixin
  ],
  props: {
    label: {
      type: String,
      default: () => "Типы документов об образовании"
    } as PropOptions<string>,
  },
  data: () => ({
    education_doc_names: [] as EducationDocNamesApiPayload[],
  }),
  async mounted () {
    const { valid, data: { data } } = await this.$api.educationDocNames.read()
    if ( valid ) {
      this.education_doc_names = data
    }
  }
})
</script>
