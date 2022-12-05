<template>
  <div style="width: 100%;">
    <file-pond
      :ref="referense"
      :name="name"
      :allow-file-encode="true"
      :class="{'d-none': hidden}"
      :allow-multiple="multi"
      :label-idle="label"
      :accepted-file-types="acceptedFileType.join(',')"
      @addfile="add"
      @removefile="remove"
      @processfilestart="processStart"
      @processfileabort="processAbort"
      @processfilerevert="processRevert"
      @processfile="process"
    />

    <slot name="label" :browse="handlerInit"></slot>
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from "vue";
import {IFilePond} from "~/types/default.types";
import { createBlob } from "~/utils/not-approved/file";

export type IFileTypes =  "image/jpeg" | "image/png" | "image/jpg" | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'application/pdf'

export interface IFile {
  _relativePath: string,
  lastModified: number
  name: string
  size: number
  type: IFileTypes
  webkitRelativePath: string,
}

export interface IFileWithBlob {
  file: IFile,
  blob: string
}

// emits: update
export default Vue.extend({
  name: "form-input-file",
  props: {
    label: {
      type: String,
      default: () => "Нажмите или перетащите чтобы загрузить файл",
    } as PropOptions<string>,
    hidden: {
      type: Boolean,
      default: () => false
    } as PropOptions<boolean>,
    name: {
      type: String,
      default: () => "file-uploader",
    } as PropOptions<string>,
    referense: {
      type: String,
      default: () => 'pond'
    } as PropOptions<string>,
    acceptedFileType: {
      type: Array,
      default: () => ['image/jpeg', 'image/png']
    } as PropOptions<Array<IFileTypes>>,
    multi: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    uploadedFiles: [] as Array<IFile>,
  }),

  destroyed() {
    this.uploadedFiles = []
  },

  methods: {
    handlerInit () {
      // @ts-ignore
      this.$refs[this.referense].browse()
    },

    add (_: any, {file}: IFilePond) {
      if(!this.multi) {
        this.$emit('input', {file, blob: createBlob(file)})
      }
    },

    remove (_: any, {file}: IFilePond) {
      if(!this.multi) {
        this.$emit('input', {});
      }
      this.uploadedFiles = this.uploadedFiles.filter(uploadFile => uploadFile !== file);

    },

    processStart (error: any, filePond: IFilePond) {
      console.log(error, filePond)
    },
    processAbort (error: any, filePond: IFilePond) {
      console.log(error, filePond)
    },
    processRevert (error: any, filePond: IFilePond) {
      console.log(error, filePond)
    },
    process (error: any, filePond: IFilePond) {
      console.log(error, filePond)
    },
  }
})
</script>
