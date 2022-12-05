<template>
  <wrappers-modal-content-viewer
    body-classes="scroll-dark"
  >

    <template #header>
      <v-toolbar-title class="text-body-1">{{file.name}}</v-toolbar-title>

      <v-spacer />

      <ui-drop-menu
        v-if="headerActions.length"
        :elements="headerActions"
        close-on-content-click
        left
        nudge-bottom="56"
      />

      <v-col cols="auto">
        <v-tooltip left>
          <template #activator="{on, attrs}">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click="close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>Закрыть pdf</span>
        </v-tooltip>
      </v-col>
    </template>

    <template #header-navigation-content>
      <v-row
          v-for="anotherPage in pageCount"
          :key="anotherPage"
          :class="{'grey lighten-5': anotherPage === pageCount}"
          class="grey darken-4"
          @click.prevent="() => scrollTo(anotherPage)"
        >
          <vue-pdf-embed
            :page="anotherPage"
            :source="file.file"
            :scale="5"
            disable-text-layer
            disable-annotation-layer
            class="pdf-aside-component mb-2"
            @click="(event) => event.stopImmediatePropagation()"
          />
        </v-row>
    </template>

    <template #body>
      <vue-pdf-embed
        ref="pdfPage"
        :source="file"
        hidden
        @rendered="handleDocumentRender"
      >

      </vue-pdf-embed>

      <ui-pdf-page
        v-for="pdfPage in pageCount"
        ref="pdfPages"
        :key="pdfPage"
        :file="file.file"
        :page="pdfPage"
        :data-page="pdfPage"
        :last-page="pageCount"
        @scroll="page => currentPage = page"
        @loadeddata="(value) => loadedPages.push(value)"
      />
    </template>

    <template #footer>
      <ui-drop-menu
        top
        offset-y
        close-on-content-click
        nudge-top="16px"
        max-height="calc(50vh)"
        content-class="scroll-dark"
      >

        <template #activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            height="48"
            v-on="on"
          >
            Страница {{currentPage}} из {{pageCount}}
          </v-btn>
        </template>

        <template #list>
          <v-list dark>
            <v-list-item
              v-for="page in pageNumbers"
              :key="page"
              link
              :class="{'grey darken-3': currentPage === page}"
              @click="scrollTo(page)"
            >
              <v-list-item-title class="text-center">{{page}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </ui-drop-menu>

      <v-divider vertical class="mx-2"></v-divider>

      <slot name="footer-actions"></slot>
    </template>
  </wrappers-modal-content-viewer>
</template>

<script lang="ts">
import Vue, {PropOptions, PropType} from "vue";
import { modalMixin } from "~/mixins";
import {IDropMenuItem} from "~/components/not-approved/ui/drop-menu.vue";
import {IPagePdfLoaded} from "~/components/not-approved/ui/pdf-page.vue";

export default Vue.extend({
  name: 'pdfs-viewer',
  mixins: [modalMixin],
  props: {
    file: {
      type: Object,
      default: () => {},
    } as PropOptions<{file: string, name: string}>,
    headerActions: {
      type: Array as PropType<Array<IDropMenuItem>>,
      default: () => []
    }
  },
  data: () => ({
    currentPage: 1 as number,
    pageCount: 1 as number,
    pageNumbers: [] as Array<number>,
    loadedPages: [] as Array<IPagePdfLoaded>,
    pdfIsReady: false as boolean,
    progressValue: 0,
    appBar: {
      clipped: true,
      drawer: false,
      mini: false,
      rightMenu: false,
    },
    scale: 0,
  }),
  methods: {
    handleDocumentRender () {
      // @ts-ignore
      this.pageCount = this.$refs.pdfPage.pageCount;
      // @ts-ignore
      this.pageNumbers = this.$refs.pdfPage.pageNums
    },

    scrollTo (page: number) {
      // @ts-ignore
      const scrollToElement: HTMLElement = this.$refs.pdfPages[page - 1];

      if(scrollToElement) {
        // @ts-ignore
        scrollToElement.$el.scrollIntoView({behavior: 'smooth', block: 'center'},)
      }

      this.appBar.drawer = false
    },
  },
})
</script>

<style scoped>
.pdf-aside {
  width: 30%;
  min-width: 250px;
  max-width: 500px;
  overflow: auto;
  max-height: calc(100% - 64px + 64px);
}

.pdf-aside-component {
  position: relative;
  max-height: 40% !important;
  width: 100%;
}

.pdf-aside-component:hover {
  opacity: 0.5;
  translate: var(--transition);
  cursor: pointer;
}

.pdf-viewer-header {
  background: linear-gradient(to bottom,rgba(0,0,0,.65) 0%,transparent 100%);
}
</style>
