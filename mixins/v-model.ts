import Vue from "vue";
export default Vue.extend({

  props: {
    value: {
      type: [ Boolean, String, Object, Array ],
      default: () => null
    }
  },

  data: () => ({
    vModelValue: null
  }),


  watch: {
    value: {
      immediate: true,
      handler () {
        this.changeVModelValue()
      }
    },

    vModelValue () {
      this.$emit( 'input', this.vModelValue )
    }

  },

  methods: {
    changeVModelValue () {
      this.vModelValue = this.value
    }
  }
})
