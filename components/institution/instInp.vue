<template>
  <v-card>
    <v-text-field v-model="inpVal.val" label="Изменить данные"></v-text-field>
    <v-btn depressed color="primary" @click="Save"> save </v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    ucItemInfo: {
      type: Object,
      default: () => null,
    },
    show: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    inpVal: {
      key: "",
      val: "",
    },
  }),
  watch: {
    ucItemInfo: {
      immediate: true,
      handler() {
        this.inpVal.val = this.ucItemInfo.val
        this.inpVal.key = this.ucItemInfo.key
      },
    },
  },
  mounted() {
  },
  methods: {
    Save() {
      this.$emit("onSave", this.inpVal)
    },
  },
}
</script>