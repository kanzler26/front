<template>
  <v-dialog
    v-model="value"
    :content-class="classList"
    :max-width="width"
    scrollable
    :retain-focus="false"
    :transition="transition"
    :fullscreen="fullscreen"
    :hide-overlay="hideOverlay"
    @click:outside="close"
    @keydown.esc="close"
  >
    <slot v-if="value" :close="close" />
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "wrapper-modal-overlay",
  props: {
    value: {
      type: Boolean
    },
    width: {
      type: [ Number, String ],
      default: () => 700
    },
    contentClass: {
      type: String,
      default: () => ""
    },
    mode: {
      type: String,
      default: () => null
    },
    fullscreen: {
      type: Boolean,
      default: () => false
    },
    hideOverlay: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    classList() {
      let classList: any[] = []
      if ( this.mode === "right" ) {
        classList = [ ...classList, "dialog-mode dialog-mode-right" ]
      }
      classList = [ ...classList, this.contentClass ]
      return classList.join( " " )
    },
    transition() {
      if ( this.mode === "right" ) {
        return "slide-x-reverse-transition"
      }
      return "dialog-bottom-transition"
    }
  },
  methods: {
    close( event: { keyCode: number } ) {
      if ( ( event && ( event.keyCode === 27 || !event.keyCode ) ) || !event ) {
        this.$emit( "input", false )
        this.$emit( "onclose", false )
      }
    },
  }
})
</script>

<style>
.dialog-mode {
  position: fixed;
}

.v-dialog.dialog-mode.dialog-mode-right {
  top: 0;
  bottom: 0;
  right: 0;
  margin: 0;
  border-radius: 0;
}

.v-dialog.dialog-mode {
  min-height: 100% !important;
}

.v-dialog::-webkit-scrollbar {
  display: none;
}
</style>
