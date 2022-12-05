<template>
  <div>
    <v-text-field
      v-model="search"
      :label="label"
      :rules="rules"
      @input="(value) => $emit('input', value)"
    >
      <template #append>
        <v-tooltip top>
          <template #activator="{on, attrs}">
            <v-btn
              icon
              height="38"
              width="38"
              v-bind="attrs"
              v-on="on"
              @click="searchInDadata"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>Загрузить данные из <b>dadata.ru</b></span>
        </v-tooltip>
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import selectMixin from "~/mixins/not-approved/select";
import {IBank} from "~/plugins/api/banks.types";
// emits: change, input, exist, loading, pressed
export default Vue.extend({
  name: 'search-in-dadata',
  mixins: [selectMixin],
  props: {
    loading: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    type: {
      type: String,
      default: () => 'inn',
    } as PropOptions<'inn' | 'bik'>,
    value: {
      type: String,
      default: () => '',
    } as PropOptions<string>
  },
  data () {
    return {
      search: '',
      bank: {} as IBank,
      pressed: false,
    }
  },

  methods: {
    async searchInDadata () {
      try {
        const data = await this.$axios.get(`employer/banks/search?${this.type}=${this.search}`);
        this.bank = data.data;
        this.$emit('change', this.bank);
        this.$emit('exist', true);
      } catch (e) {
        this.$emit('exist', false)
        this.$emit('change', {});
      }

      this.$emit('loading', false)
      this.$emit('pressed', true);
    },
  }

})
</script>
