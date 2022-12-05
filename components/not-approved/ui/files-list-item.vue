<template>
  <div>
    <ui-form-input-file
      v-model="file.file"
      :accepted-file-type="['image/jpeg', 'image/png', 'application/pdf']"
      :hidden="true"
    >
      <template #label="{browse}">
        <v-list-item
          link
          :class="{'blue lighten-5': isNotApprove}"
          @click="file.file?.file?.type ? previewFile(file.file) : browse()"
        >
          <v-list-item-icon>
            <v-icon>mdi-file-document-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{file.name}}</v-list-item-title>
            <v-list-item-subtitle class="text-truncate">
              {{file.file?.file?.type || "Не загружено"}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-card-actions>

            <template v-if="file.file?.file?.type">

              <v-tooltip top>
                <template #activator="{on, attrs}">
                  <v-btn
                    icon
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                    @click="approve"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </template>
                <span>Одобрить</span>
              </v-tooltip>

              <v-tooltip top>
                <template #activator="{on, attrs}">
                  <v-btn
                    icon
                    color="orange"
                    v-bind="attrs"
                    v-on="on"
                    @click="notApprove"
                  >
                    <v-icon>mdi-alert</v-icon>
                  </v-btn>
                </template>
                <span>На доработку</span>
              </v-tooltip>

              <v-tooltip top>
                <template #activator="{on, attrs}">
                  <v-btn
                    icon
                    color="primary"
                    v-bind="attrs"
                    :href="file.file.blob"
                    :download="file.name"
                    v-on="on"
                    @click="event => event.stopImmediatePropagation()"
                  >
                    <v-icon>mdi-file-download</v-icon>
                  </v-btn>
                </template>
                <span>Скачать файл</span>
              </v-tooltip>

              <v-tooltip top>
                <template #activator="{on, attrs}">
                  <v-btn
                    icon
                    color="error"
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent="remove"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Удалить файл</span>
              </v-tooltip>
            </template>

            <template v-else>
              <v-tooltip top>
                <template #activator="{on, attrs}">
                  <v-btn
                    color="primary"
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="browse"
                  >
                    <v-icon>mdi-file-upload</v-icon>
                  </v-btn>
                </template>
                <span>Загрузить файл</span>
              </v-tooltip>
            </template>
          </v-card-actions>
        </v-list-item>
      </template>
    </ui-form-input-file>

    <!--  modals images slider  -->

    <wrappers-modal-overlay v-model="preview.image" fullscreen>
      <template #default="props">
        <views-images v-bind="props" :images="[{name: file.name, url: file.file.blob}]">
          <template #more-actions>
            <v-col cols="auto">
              <v-tooltip top>
                <template #activator="{on, attrs}">
                  <v-btn
                    icon
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                    @click="approve"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </template>
                <span>Одобрить</span>
              </v-tooltip>
            </v-col>

            <v-col cols="auto">
              <v-tooltip top>
                <template #activator="{on, attrs}">
                  <v-btn
                    icon
                    color="orange"
                    v-bind="attrs"
                    v-on="on"
                    @click="notApprove"
                  >
                    <v-icon>mdi-alert</v-icon>
                  </v-btn>
                </template>
                <span>На доработку</span>
              </v-tooltip>
            </v-col>
          </template>
        </views-images>
      </template>
    </wrappers-modal-overlay>

    <!--  modals images slider  -->

    <!--  modals pdf viewer  -->

    <wrappers-modal-overlay
      v-model="preview.pdf"
      fullscreen
      mode="top"
    >
      <template #default="props">
        <views-pdfs
          v-bind="props"
          :file="{file:file.file.blob, name: file.name}"
        >
          <template #footer-actions>
            <v-tooltip top>
              <template #activator="{on, attrs}">
                <v-btn
                  icon
                  color="success"
                  height="48"
                  width="48"
                  v-bind="attrs"
                  v-on="on"
                  @click="approve"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </template>
              <span>Одобрить</span>
            </v-tooltip>

            <v-tooltip top>
              <template #activator="{on, attrs}">
                <v-btn
                  icon
                  color="orange"
                  height="48"
                  width="48"
                  v-bind="attrs"
                  v-on="on"
                  @click="notApprove"
                >
                  <v-icon>mdi-alert</v-icon>
                </v-btn>
              </template>
              <span>На доработку</span>
            </v-tooltip>
          </template>
        </views-pdfs>
      </template>
    </wrappers-modal-overlay>

    <!--  modals pdf viewer  -->

    <!--  modals not approve  -->

    <wrappers-modal-overlay  v-model="isNotApprove">
      <template #default="props">
        <modals-documents-not-approve v-bind="props"/>
      </template>
    </wrappers-modal-overlay>

    <!--  modals not approve  -->
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import {IFile, IFileWithBlob} from "~/components/not-approved/ui/form-input-file.vue";

export default Vue.extend({
  name: 'files-list-item',
  props: {
    file: {
      type: Object,
      default: () => {},
    } as PropOptions<{name: string, file: IFileWithBlob | {}}>
  },

  data: () => ({
    isNotApprove: false as boolean,
    preview: {
      image: false,
      pdf: false,
    },
    isTest: true,
  }),

  methods: {
    remove (event: Event) {
      event.stopImmediatePropagation()

      this.file.file = {
        file: {},
        blob: ''
      }
    },

    previewFile ({file}: IFile | any) {
      if(this.isNotApprove) {
        this.isNotApprove = !this.isNotApprove
      }

      if(file.type === 'application/pdf') {
        this.preview.pdf = !this.preview.pdf
      } else {
        this.preview.image = !this.preview.image
      }
    },

    notApprove (event: Event) {
      event.stopImmediatePropagation();

      this.isNotApprove = !this.isNotApprove
    },

    approve (event: Event) {
      event.stopImmediatePropagation();

      if(this.preview.pdf) {
        this.preview.pdf = false
      }

      if(this.preview.image) {
        this.preview.image = false
      }
    }

  },
})
</script>
