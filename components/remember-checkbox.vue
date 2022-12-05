<template>
  <v-checkbox
    v-model="vModelValue"
    :label="label"
    :disabled="!canSwitch"
  ></v-checkbox>
</template>

<script lang="ts">
import Vue from "vue"
import {
  vmodelMixin
} from "~/mixins"

export default Vue.extend({
  name: "remember-checkbox",
  mixins: [
    vmodelMixin
  ],
  props: {
    name: {
      type: String,
      default: () => null
    },
    label: {
      type: String,
      default: () => null
    }
  },
  data: () => ({
    memory: {} as { [ key: string ]: string }
  }),
  computed: {
    canSwitch () {
      return !!this.name
    }
  },
  watch: {
    vModelValue () {
      // @ts-ignore
      this.memory[ this.name ] = this.vModelValue
      localStorage.setItem( 'remember_checkbox', JSON.stringify( this.memory ) )
    }
  },
  mounted () {
    // @ts-ignore
    this.setMemory()
    // @ts-ignore
    if ( this.name && this.memory[ this.name ] ) {
      // @ts-ignore
      this.vModelValue = true
    }
  },
  methods: {
    setMemory () {
      const memory = localStorage.getItem( 'remember_checkbox' ) || ''
      if ( memory ) {
        try {
          // @ts-ignore
          this.memory = JSON.parse( memory )
        } catch ( error ) {
          console.log( error )
        }
      }
    }
  }
})
</script>
