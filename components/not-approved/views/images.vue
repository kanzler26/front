<template>
  <wrappers-modal-content-viewer :header-navigation="false">
    <template #header>
      <v-toolbar-title class="text-body-1">{{currentSlideInfo.name}}</v-toolbar-title>

      <v-spacer />

      <v-col cols="auto" class="pr-0">
        <v-tooltip top>
          <template #activator="{on, attrs}">
            <v-btn
              icon
              :download="currentSlideInfo.name"
              :href="currentSlideInfo.url"
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-file-download</v-icon>
            </v-btn>
          </template>
          <span>Скачать изображение</span>
        </v-tooltip>
      </v-col>

      <v-col cols="auto" class="pr-0">
        <v-tooltip top>
          <template #activator="{on, attrs}">
            <v-btn
              icon
              :href="currentSlideInfo.url"
              target="_blank"
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
            </v-btn>
          </template>
          <span>Открыть изображение в новом окне</span>
        </v-tooltip>

      </v-col>

      <v-col cols="auto" class="pr-0">
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

    <template #body>

      <v-hover v-slot="{hover}">
        <v-col cols="auto" class="carousel-arrow-wrapper left">
          <v-btn
            v-if="hover"
            icon
            class="grey darken-4"
            height="64"
            width="64"
            :disabled="arrowDisabledPrev"
            @click="prev"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-col>
      </v-hover>

      <v-carousel
        v-model="currentSlideIndex"
        hide-delimiters
        :show-arrows="false"
        style="height: 100%;"
      >
          <v-carousel-item
            v-for="(image, index) in images"
            :key="index"
          >
            <img :src="image.url" class="carousel-image"/>
          </v-carousel-item>
      </v-carousel>

      <v-hover v-slot="{hover}">
        <v-col cols="auto" class="carousel-arrow-wrapper right">
          <v-btn
            v-if="hover"
            icon
            class="grey darken-4"
            height="64"
            width="64"
            :disabled="arrowDisabledNext"
            @click="next"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-hover>
    </template>

    <template #footer>

      <v-tooltip top>
        <template #activator="{on, attrs}">
          <v-btn
            icon
            height="48"
            width="48"
            class="mr-2"
            v-bind="attrs"
            :disabled="arrowDisabledPrev"
            v-on="on"
            @click="prev"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <span>Предыдущий слайд</span>
      </v-tooltip>

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
            Изображение {{currentSlideNumber}} из {{images.length}}
          </v-btn>
        </template>

        <template #list>
          <v-list dark>
            <v-list-item
              v-for="(imageIndex) in images.length"
              :key="imageIndex"
              link
              :disabled="currentSlideIndex + 1 === imageIndex"
              @click="currentSlideIndex = imageIndex - 1"
            >
              <v-list-item-title class="text-center">{{imageIndex}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </ui-drop-menu>

      <v-tooltip top>
        <template #activator="{on, attrs}">
          <v-btn
            icon
            height="48"
            width="48"
            class="ml-2"
            v-bind="attrs"
            :disabled="arrowDisabledNext"
            v-on="on"
            @click="next"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>Следующий слайд</span>
      </v-tooltip>

      <v-divider vertical class="mx-2"></v-divider>

      <slot name="more-actions"></slot>
    </template>
  </wrappers-modal-content-viewer>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import { modalMixin } from "~/mixins";

export default Vue.extend({
  name: 'modals-images-viewer',
  mixins: [modalMixin],
  props: {
    images: {
      type: Array,
      default: () => [],
    } as PropOptions<Array<{url: string, name: string}>>
  },


  data: () => ({
    startSlide: 1,
    currentSlideIndex: 0,
    appBar: {
      clipped: true,
      drawer: false,
      mini: false,
      rightMenu: false,
    },

  }),

  computed: {
    currentSlideInfo (): {url: string, name: string} {
      return this.images[this.currentSlideIndex]
    },

    arrowDisabledPrev (): boolean {
      return this.currentSlideNumber === this.startSlide;
    },

    arrowDisabledNext (): boolean {
      return  this.currentSlideNumber === this.images.length
    },

    currentSlideNumber (): number {
      return this.currentSlideIndex + 1;
    }
  },

  methods: {
    prev () {
      if(this.currentSlideNumber === this.startSlide) {
        return
      }
      this.currentSlideIndex--
    },
    next () {
      if(this.currentSlideNumber === this.images.length) {
        return
      }
      this.currentSlideIndex++
    },
  },
})
</script>


<style>

.carousel-image {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.carousel-arrow-wrapper {
  position: absolute;
  top: 0;
  min-width: 120px;
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease 0.5s;
  z-index: 5;
}

.carousel-arrow-wrapper:hover {
  background: rgba(0,0,0,0.5);
}

.carousel-arrow-wrapper.left {
  left: 0;
}

.carousel-arrow-wrapper.right {
  right: 0;
}

</style>
