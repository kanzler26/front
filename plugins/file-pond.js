import Vue from 'vue'

import VueFilePond from "vue-filepond";
import {setOptions} from "filepond";

import rus from 'filepond/locale/ru-ru'
// eslint-disable-next-line import/default
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
// eslint-disable-next-line import/default
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
// eslint-disable-next-line import/default
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
// eslint-disable-next-line import/default
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// eslint-disable-next-line import/default
import FilePondPluginImageResize from 'filepond-plugin-image-resize'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';

const FilePond = VueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageEdit
)

setOptions({ ...rus })

Vue.component( 'file-pond', FilePond )
