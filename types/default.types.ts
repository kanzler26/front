import {Ref} from "vue";
import {IFile, IFileTypes} from "~/components/not-approved/ui/form-input-file.vue";

export interface IDefault {
  id: number
}

export interface IResponseLink {
  url: string | null,
  label: string,
  active: boolean
}

export interface IGenericResponseData<T> {
  data: T,
  links?: {
    first: string,
    last: string,
    prev: number | null,
    next: number | null
  },
  meta?: {
    currentPage: number,
    from: number,
    last_page: number,
    links: Array<IResponseLink>,
    path: string,
    per_page: number,
    to: number,
    total: number
  }
}

export interface IRefFormVuetify extends Ref<Element> {
  validate: () => {},
  reset: () => {},
}

export interface IFilePond extends IDefault {
  abortedLoad: () => {},
  abortProcessing: () => {},
  edit: () => {},
  file: IFile,
  fileExtension: string,
  fileSize: bigint,
  fileType: IFileTypes,
  filename: string,
  filenameWithoutExtension: string,
  fireSync: () => {},
  origin: number,
  relativePath: string,
  serverId: null,
  source: IFile,
  status: number,
  transferId: number | null
}
