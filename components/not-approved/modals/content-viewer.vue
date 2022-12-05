<template>
  <v-card
    tile flat
    dark
    elevation="0"
  >

    <v-app-bar
      elevation="0"
      dark
      fixed
      clipped-right
      height="64"
      class="transparent modal-window-content-header"
    >
      <v-app-bar-nav-icon v-if="headerNavigation" @click.stop="header.drawer = !header.drawer" />
      <slot name="header"></slot>
    </v-app-bar>

    <v-navigation-drawer
      v-model="header.drawer"
      :clipped="header.clipped"
      fixed
      dark
      temporary
      width="500px"
      color="grey darken-4"
      class="scroll-dark"
    >
      <slot name="header-navigation-content"></slot>
    </v-navigation-drawer>

    <div class="modal-window-content scroll-dark">
      <slot name="body"></slot>

    </div>
    <v-card-actions
      v-if="!hideFooter"
      class="pa-1 px-1 mb-4 modal-window-content-footer"
      tag="footer"
    >
      <slot name="footer"></slot>
    </v-card-actions>
  </v-card>
</template>


<script lang="ts">
import Vue, {PropOptions} from "vue";

export default Vue.extend({
  name: 'wrapper-modal-content-viewer',
  props: {
    hideHeader: {
      type: Boolean,
      default: () => false
    },
    theme: {
      type: String,
      default: () => 'light'
    } as PropOptions<string>,
    headerNavigation: {
      type: Boolean,
      default: () => true
    },
    hideWindowBodyColor: {
      type: Boolean,
      default: false
    },
    hideBody: {
      type: Boolean,
      default: () => false
    },
    hideFooter: {
      type: Boolean,
      default: () => false
    },
    bodyClasses: {
      type: String,
      default: () => ""
    }
  },
  data: () => ({
    header: {
      clipped: true,
      drawer: false,
      mini: false,
      rightMenu: false,

    }
  })
})
</script>

<style scoped>

.modal-window-content {
  position: relative;
  overflow: auto;
}

.modal-window-content-header {
  background: linear-gradient(to bottom,rgba(0,0,0,.65) 0%,transparent 100%);
  z-index: 9;
}

.modal-window-content-footer {
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: rgba(0,0,0,.75);
  min-height: 48px;
  min-width: 250px;
  padding: 0 16px;
}

.modal-window-body {
  height: calc(100vh);
}

</style>
