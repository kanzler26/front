<template>
  <v-menu v-model="modalShow">
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        outlined
        dark
        :close-on-click="false"
        v-bind="attrs"
        v-on="on"
        @click="callLogoModal"
      >
        изменить<br />изображение
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-form>
          <v-file-input
            :rules="rules"
            color="primary"
            show-size
            truncate-length="50"
            accept="image/png, image/jpeg, image/gif"
          ></v-file-input>
        </v-form> </v-container
    ></v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    modalShow: false,
    rules:[
      val=>!val||val.size< 200_000_000 || "Размер не должен превышать 200 мб"
    ],
  }),
  watch: {
    value: {
      immediate: true,
      handler() {
        this.modalShow = this.value
      },
    },
  },
  methods: {
    callLogoModal() {
      console.log("callLogoModal:from logo component")
    },
  },
}
</script>