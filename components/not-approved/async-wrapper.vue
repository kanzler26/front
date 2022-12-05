<template>
  <div>
    <template v-if="isLoading">
      <ui-loader/>
    </template>
    <slot v-if="isError" name="error"></slot>
    <slot v-if="!isLoading"></slot>
  </div>
</template>
<script lang="ts">
import Vue, {PropType} from "vue";

export default Vue.extend({
  name: "async-wrapper",
  props: {
    dataLength: {
      type: Number as PropType<number>,
      default: 0
    },
    isLoading: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false
    },
    isError: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false
    }
  }
})
</script>
