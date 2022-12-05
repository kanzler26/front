import Vue, {PropOptions} from "vue";


// todo: непонятно что с этим делать

const selectMixin = Vue.extend({
  props: {
    label: {
      type: String,
      default: () => 'Не выбрано'
    },
    fieldForView: {
      type: String,
      default: () => "name"
    },
    rules: {
      type: Array,
      default: () => [],
    } as PropOptions<Array<Function>>,
    hideDetails: {
      type: Boolean,
      default: () => false
    },
    dense: {
      type: Boolean,
      default: () => false
    }
  },

  methods: {
    selectValue (value: string | object) {
     this.$emit('change', value)
    }
  },
})

export default selectMixin
