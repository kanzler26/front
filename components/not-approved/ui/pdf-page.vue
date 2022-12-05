<template>
  <div>
    <div
      class="skeleton-pdf-page grey darken-3 mb-4"
    >
      <vue-pdf-embed
        v-show="isLoaded"
        :ref="reference"
        :source="file"
        :page="page"
        class="pdf-page"
        :style="{ 'width': scale + '%' }"
        @loaded="(value) => loaded(value)"
        @loading-failed="(value) => failedLoaded(value)"
      >

      </vue-pdf-embed>

      <div
        v-intersect="(entries, observer, isIntersecting) => isIntersecting && scrolled()"
        class="observer-center"
      ></div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";

export interface IPagePdfLoaded {
  pageNumber: number,
  loaded: boolean
}

export default Vue.extend({
  name: 'pdf-page',
  props: {
    file: {
      type: String,
      default: ""
    } as PropOptions<string>,
    page: {
      type: Number,
      default: 1,
    } as PropOptions<number>,
    lastPage: {
      type: Number,
      default: () => 1,
      required: true
    },
    scale: {
      type: Number,
      default: 100,
    },
    reference: {
      type: String,
      default: ""
    } as PropOptions<string>
  },

  data: () => ({
    isScrolled: false,
    isLoaded: false
  }),

  destroyed() {
    this.isLoaded = false
  },

  methods: {
    loaded () {
      this.isLoaded = true;
      this.$emit('loadeddata', {pageNumber: this.page, loaded: this.isLoaded});
    },

    failedLoaded () {
      this.isLoaded = false;
      this.$emit('loadeddata', {pageNumber: this.page, loaded: this.isLoaded});
    },
    scrolled () {
      this.$emit('scroll', this.page)
    }
  }
})
</script>

<style scoped>
.skeleton-pdf-page {
  display: flex;
  position: relative;
  min-height: 100vh;
  height: 100%;
}

</style>
