<template>
  <v-card
    tile flat
    :loading="loading"
    elevation="0"
  >
    <v-toolbar
      v-if="!hideHeader"
      elevation="0"
      max-height="64"
      class="modal-window-header"
      :class="paddingHeader ? paddingHeader : null"
    >
      <slot name="header" />
    </v-toolbar>

    <v-divider v-if="!hideBody || !hideBody" />

    <v-card-text
      v-if="!hideBody"
      elevation="0"
      :class="paddingBody ? paddingBody : null"
      class="modal-window-body"
    >
      <slot name="body" />
    </v-card-text>

    <v-divider v-if="!hideFooter || !hideBody" />

    <v-card-actions
      v-if="!hideFooter"
      :class="paddingFooter ? paddingFooter : null"
      class="modal-window-footer"
    >
      <slot name="footer" />
    </v-card-actions>

  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

export default Vue.extend({
  name: "wrapper-modal-content",
  props: {
    hideHeader: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    hideBody: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    hideFooter: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    paddingHeader: {
      type: String,
      default: () => null
    } as PropOptions<string>,
    paddingBody: {
      type: String,
      default: () => "pa-4"
    } as PropOptions<string>,
    paddingFooter: {
      type: String,
      default: () => "pa-4"
    } as PropOptions<string>,
    loading: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
  }
})
</script>

<style scoped>
.modal-window-header {
  /* ~~~ */
}

.modal-window-body {
  font: inherit !important;
  color: inherit !important;
}

.modal-window-footer {
  /* ~~~ */
}
</style>
