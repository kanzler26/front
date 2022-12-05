<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :loading="loading"
      :type="type"
      :class="initClasses"
      height="500"
    />

    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";

export default Vue.extend({
  name: 'wrappers-skeleton',
  props: {
    type: {
      type: String,
      default: () => "",
    } as PropOptions<string>,

    initClasses: {
      type: String,
      default: () => '',
    } as PropOptions<string>,
    loading: {
      type: Boolean,
      default: false,
    }

  },
})
</script>
