<template>
  <v-form
    ref="form"
    :value="isValidate"
    lazy-validation
    @submit.prevent="submit"
  >
    <v-row dense class="mx-0">
      <v-combobox
        v-model="selectedReason"
        :items="defaultReason"
        :rules="[$rules.length.min(1, 'причина')]"
        multiple
        chips
        deletable-chips
        clearable
        :search-input.sync="newReason"
        label="Причина(ы)"
        append-icon=""
        single-line
      >
        <template #no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
               Нажмите <kbd>enter</kbd> для того чтобы добавить новую причину
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
    </v-row>

    <v-row dense>
      <v-spacer></v-spacer>

      <slot name="actions"></slot>

      <v-col cols="auto">
        <v-btn
          text
          type="submit"
          color="primary"
        >
          Отправить
        </v-btn>
      </v-col>

    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import {IRefFormVuetify} from "~/types/default.types";

export default Vue.extend({
  name: 'form-not-approve',
  data: () => ({
    formRef: {} as IRefFormVuetify,
    isValidate: false,
    selectedReason: [],
    newReason: "",
    defaultReason: [
      'Причина 1',
      'Причина 2',
      'Причина 3',
      'Причина 4',
      'Причина 5',
      'Причина 6'
    ]
  }),
  mounted() {
    // @ts-ignore
    this.formRef = this.$refs.form
  },
  methods: {
    submit () {
      this.formRef.validate()
      if(this.isValidate) {
        this.$emit('submit', this.selectedReason);
      }
    }
  },
})
</script>

<style scoped>
.select-field {
  position: relative;
}
</style>
