<template>
  <v-menu v-model="dialog" :close-on-content-click="false" offset-x>
    <template #activator="{ on, attrs }">
      <v-btn
        color="red-lighten-2"
        class="ma-2"
        icon
        x-small
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </template>
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
  </v-menu>
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
    dialog:false,
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