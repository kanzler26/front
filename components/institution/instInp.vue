<template>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="inpVal.val"
              label="Изменить данные"
              outlined
              hide-details
            />
          </v-col>
        </v-row>
        <!-- <v-col class="text-right"> -->
        <v-row>
          <v-spacer />
          <v-col cols="auto">
            <v-btn color="primary" outlined @click="Save"> save </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <!-- </v-col> -->
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
    show: {
      immediate: true,
      handler() {
        this.dialog = this.show
      },
    },
  },
  mounted() {},
  methods: {
    Save() {
      this.$emit("onSave", this.inpVal)
      this.dialog = !this.dialog
      console.log(this.dialog)
    },
  },
}
</script>