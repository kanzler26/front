<template>
  <div>
    <div class="position-top-sticky">
      <slot name="toolbar"></slot>
    </div>
    <v-container fluid :style="style">
      <slot></slot>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ui-container",
  props: {
    maxWidth: {
      type: [ Boolean, Number, String ],
      default: () => null
    }
  },
  computed: {
    style () {
      const style = {
        // margin: '0 auto'
      }
      if ( this.maxWidth ) {
        if ( typeof this.maxWidth === 'boolean' ) {
          style.maxWidth = '900px'
        } else {
          style.maxWidth = `${this.maxWidth}px`
        }
      }
      return style
    }
  }
}
</script>
