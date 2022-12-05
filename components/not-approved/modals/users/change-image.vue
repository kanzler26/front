<template>
  <wrappers-modal-content>
    <template #header>
      <v-toolbar-title>
       {{Object.keys(image).length !== 0 ? "Изменение" : "Добавление"}} фотографии
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <template #body>
     <ui-form-input-file
      min-height="250"
      @change="files => newImage = files[0]"
     />
    </template>
    <template #footer>
      <v-btn color="error" text>Закрыть</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="() => save()"> Сохранить</v-btn>
    </template>
  </wrappers-modal-content>
</template>
<script lang="ts">
import Vue, {PropOptions} from "vue";
import { modalMixin } from "~/mixins";
import {IFile} from "~/plugins/api/users/users.types";

export default Vue.extend({
  name:"modals-edit-image",
  mixins: [modalMixin],
  props: {
    image: {
      type: Object as IFile | {},
      required: true,
      default: () => {},
    } as PropOptions<IFile | {}>
  },

  data: () => ({
    newImage: {} as IFile,
  }),

  mounted () {

  },
  methods: {
    save () {
      this.$emit('change', this.newImage);
      this.$props.close();
    }
  }
})
</script>
