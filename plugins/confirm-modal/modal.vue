<template>
  <v-dialog
    v-model="display"
    :max-width="width"
    scrollable
    :retain-focus="false"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card
      tile flat
      elevation="0"
    >

      <v-toolbar
        elevation="0"
        max-height="64"
        class="modal-window-header"
      >
        <v-icon class="mr-4">{{ icon }}</v-icon>
        <v-toolbar-title>
          {{ header }}
        </v-toolbar-title>
        <v-spacer/>
      </v-toolbar>

      <v-divider/>

      <v-card-text
        elevation="0"
        class="modal-window-body pa-4"
      >
        {{ message }}
      </v-card-text>

      <v-divider/>

      <v-card-actions class="pa-4">
        <v-btn color="error" text @click="close">Отмена</v-btn>
        <v-spacer/>
        <v-btn ref="confirm" color="primary" text @click="confirm">Подтвердить</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script lang="ts">

import Vue from "vue"

export default Vue.extend({
  name: "modals-test",
  props: {
    header: {
      type: String,
      default: () => 'Внимание'
    },
    icon: {
      type: String,
      default: () => 'mdi-information-outline'
    },
    message: {
      type: String,
      default: () => 'Вы действительно хотите это сделать ?'
    },
  },
  data: () => ({
    display: true,
    width: 500
  }),
  mounted () {
    // @ts-ignore
    this.$refs.confirm.$el.focus()
  },
  methods: {
    close () {
      this.display = false
      this.$emit( 'close', false )
    },
    confirm () {
      this.display = false
      this.$emit( 'close', true )
    }
  },
})

</script>

<style>
.modal-window-body {
  font: inherit !important;
  color: inherit !important;
}
</style>
