<template>
  <div dense class="align-center justify-center d-flex">
    <v-col dense class="align-center d-flex flex-column">
      <v-progress-linear
        class="mb-6"
        :value="currentLoaded"
      />
      <slot name="annotation"></slot>
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";

export default Vue.extend({
  name: 'loaders-progress-bar',
  props: {
    value: {
      type: Number,
      default: () => 0
    },
    countElement: {
      type: Number,
      default: () => 0
    } as PropOptions<number>,
    loadedCount: {
      type: Number,
      default: () => 0
    } as PropOptions<number>
  },

  data: () => ({
    currentLoaded: 0
  }),

  computed : {
    percent (): number {
      return 100 / this.countElement
    },
  },

  watch: {
    value (value: number) {
      this.currentLoaded = value * this.percent;

      const valueFixed: string = Number(this.currentLoaded).toFixed();
      const readyValue: number = Number(valueFixed)

      this.$emit('change', readyValue)
    },

    currentLoaded (value: number) {
      const isLoaded = value === 100;

      if(isLoaded) {
        this.$emit('loaded', isLoaded)
      }
    }
  },

})

</script>
