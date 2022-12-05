import Vue, { PropOptions } from "vue"

export default Vue.extend({

  props: {
    close: {
      type: Function,
      default: () => null
    } as PropOptions<() => null>
  },

  data: () => ({
    loading: false as boolean
  }),

  methods: {
    modalLoading ( status: boolean ) {
      this.loading = status
    }
  }

})
